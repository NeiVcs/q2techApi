import { fastify, FastifyInstance } from 'fastify';
import GracefulServer from '@gquittet/graceful-server';
import { envConfig } from '@config/env';
import { ErrorHandler } from '@middlewares/errorHandler';
import { NotFoundHandler } from '@middlewares/notFoundHandler/RouteNotFoundMiddleware';
import { RegisterLogger } from '@middlewares/registerLogger';
import { HealthSchema } from '@shared/schemas';
import { SecurityMiddleware } from '@middlewares/securityMiddleware';
import { RegisterSwaggerDoc } from '@middlewares/swaggerDoc';
import { logger } from '@shared/logger';
import { routesV1 } from '@modules/routes.v1';
import { initContextMiddleware } from '@middlewares/initContextMiddleware';
import { CodeErrors } from '@shared/exceptions';
import { MultipartMiddleware } from '@middlewares/multipartMiddleware';
import ajvErrors from 'ajv-errors';

let isShuttingDown = false;
const GRACEFUL_SHUTDOWN_TIME = envConfig.NODE_ENV === 'production' ? 70 * 1000 : 1;

const createServer = (): FastifyInstance => {
  const fastifyInstance = fastify({
    logger: false,
    return503OnClosing: true,
    disableRequestLogging: true,
    bodyLimit: envConfig.BODY_LIMIT,
    trustProxy: envConfig.NODE_ENV === 'production', // Trust proxy only in production, especially when behind AWS ALB
    ajv: {
      customOptions: {
        allErrors: true,
        coerceTypes: true,
        removeAdditional: 'all'
      },
      plugins: [[ajvErrors, { singleError: false }]]
    }
  });

  fastifyInstance.server.keepAliveTimeout = 75_000; // If AWS ALB uses 60s by default, 75s gives leeway
  fastifyInstance.server.headersTimeout = 76_000; // headersTimeout > keepAliveTimeout
  fastifyInstance.server.maxHeadersCount = 100; // Maximum number of HTTP headers
  fastifyInstance.server.requestTimeout = 0; // No limit
  fastifyInstance.setErrorHandler(ErrorHandler);
  fastifyInstance.setNotFoundHandler(NotFoundHandler);

  return fastifyInstance;
};

const routeHealth = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.get('/health', { schema: HealthSchema }, async (_, reply) => {
    const statusCode = isShuttingDown ? 503 : 200;
    reply.code(statusCode);
    return isShuttingDown
      ? {
        errors: [CodeErrors.CODE_ERROR_SERVICE_UNAVAILABLE]
      }
      : {
        status: 'OK',
        uptime: process.uptime(),
        timestamp: new Date().toISOString()
      };
  });
};

const apiGracefulShutdownEvents = (fastifyInstance: FastifyInstance) => {
  const gracefulServer = GracefulServer(fastifyInstance.server, { timeout: GRACEFUL_SHUTDOWN_TIME });

  gracefulServer.on(GracefulServer.SHUTTING_DOWN, async () => {
    isShuttingDown = true;
    logger.info(`API server is shutting down...`);
    await Promise.all([fastifyInstance.close()]);
  });

  gracefulServer.on(GracefulServer.SHUTDOWN, async (error: Error) => {
    logger.warn(`API server is shutting down due to '${error?.message || 'unknown reason'}'`);

    /* Force shutdown if not closed after 20 seconds */
    setTimeout(() => {
      logger.warn('API shutdown timed out, forcing exit.');
      process.exit(1);
    }, 20_000).unref();
  });

  return gracefulServer;
};

const processApiUnhandledError = () => {
  if (envConfig.NODE_ENV === 'production') {
    process.on('uncaughtException', (error: Error) => {
      logger.fatal({ error }, `Uncaught exception na API.`);
      setTimeout(() => process.exit(1), 5000).unref();
    });
    process.on('unhandledRejection', (error) => {
      logger.fatal({ error }, `Unhandled rejection na API.`);
      setTimeout(() => process.exit(1), 5000).unref();
    });
  }
};

export const serverHttp = async (): Promise<void> => {
  const port = envConfig.PORT;
  const fastifyInstance = createServer();

  fastifyInstance.addHook('onRequest', initContextMiddleware);

  if (envConfig.ENABLED_SWAGGER) {
    await RegisterSwaggerDoc(fastifyInstance);
  }

  SecurityMiddleware(fastifyInstance);
  RegisterLogger(fastifyInstance);
  MultipartMiddleware(fastifyInstance);
  fastifyInstance.register(routeHealth, { prefix: envConfig.API_PREFIX_ROUTE });
  fastifyInstance.register(routesV1, { prefix: envConfig.API_PREFIX_ROUTE });

  const gracefulServer = apiGracefulShutdownEvents(fastifyInstance);
  processApiUnhandledError();

  try {
    await fastifyInstance.listen({ port, host: '0.0.0.0' });
    gracefulServer.setReady();
    logger.info(`Running Http Server on ${port} - NODE_ENV: ${envConfig.NODE_ENV} `);
  } catch (error) {
    logger.fatal(error);
    process.exit(1);
  }
};
