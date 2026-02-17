import { DoneFuncWithErrOrRes, FastifyInstance, FastifyReply, FastifyRequest, HookHandlerDoneFunction } from 'fastify';
import { RestAuditLog } from '@middlewares/registerLogger/types';
import { logger } from '@shared/logger';

export const RegisterLogger = (fastifyInstance: FastifyInstance) => {
  fastifyInstance.addHook('onRequest', (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    return done();
  });

  fastifyInstance.addHook('onResponse', (request: FastifyRequest, reply: FastifyReply, done: HookHandlerDoneFunction) => {
    const skipRoutes = ['/health', 'is-alive', '/docs', '/admin/queues'];
    const shouldSkip = skipRoutes.some((route) => request.routeOptions.url.includes(route));
    if (!shouldSkip && reply.raw.statusCode < 400) {
      const restAuditLog: RestAuditLog = {
        logType: 'AUDIT_LOG_REST',
        method: `${request.method} ${request.routeOptions.url}`,
        originalMethod: `${request.method} ${request.originalUrl}`,
        statusCode: reply.raw.statusCode,
        parameters: request.params || {},
        query: request.query || {},
        headers: request.headers || {},
        requestBody: request.body || {},
        responseBody: (reply as any)._body ?? {},
        elapsedTime: reply.elapsedTime ? Number(reply.elapsedTime.toFixed(4)) : 0.0
      };

      if (restAuditLog.method && restAuditLog.method.startsWith('GET')) {
        restAuditLog.responseBody = {};
      }

      logger.info(restAuditLog);
    }
    return done();
  });

  fastifyInstance.addHook('preSerialization', (_: FastifyRequest, reply: FastifyReply, payload: unknown, done: DoneFuncWithErrOrRes) => {
    (reply as any)._body = payload;
    done(null, payload);
  });
};
