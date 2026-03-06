import jwt from 'jsonwebtoken';
import { FastifyReply, FastifyRequest } from 'fastify';
import { AccessDeniedException, CodeErrors, UnauthorizedException } from '@shared/exceptions';
import { envConfig } from '@config/env';
import { RestAuditLog } from '@middlewares/registerLogger/types';
import { logger } from '@shared/logger';
import { AsyncHooksContext } from '@shared/asyncHooks';

const UnauthorizedResponse = {
  errors: [CodeErrors.CODE_ERROR_UNAUTHORIZED]
};

const registerLoggerError = (request: FastifyRequest, reply: FastifyReply, error?: any) => {
  const restAuditLog: RestAuditLog = {
    logType: 'AUDIT_LOG_REST',
    method: `${request.method} ${request.routeOptions.url}`,
    originalMethod: `${request.method} ${request.originalUrl}`,
    statusCode: reply.statusCode,
    parameters: request.params || {},
    query: request.query || {},
    headers: request.headers || {},
    requestBody: request.body || {},
    responseBody: UnauthorizedResponse,
    stackError: error?.stack || null,
    elapsedTime: reply.elapsedTime ? Number(reply.elapsedTime.toFixed(4)) : 0.0
  };

  logger.error(restAuditLog);
};

/**
 * Authentication middleware that verifies x-api-key header.
 * If x-api-key is invalid, sends 401 Unauthorized response.
 *
 * @param {FastifyRequest} request - The incoming Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object used to send responses.
 * @returns {Promise<void|FastifyReply>} Returns early with 401 Unauthorized response if token is invalid or missing.
 */
export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply): Promise<void | FastifyReply> => {
  try {
    const xApiKey = request.headers['x-api-key'] as string | undefined;

    if (xApiKey !== envConfig.API_KEY_API) {
      registerLoggerError(request, reply);
      return reply.code(401).send(UnauthorizedResponse);
    }
  } catch (error) {
    registerLoggerError(request, reply, error);
    return reply.code(401).send(UnauthorizedResponse);
  }
};

/**
 * Authentication middleware that verifies token header.
 * If token is invalid, sends 401 Unauthorized response.
 *
 * @param {FastifyRequest} request - The incoming Fastify request object.
 * @param {FastifyReply} reply - The Fastify reply object used to send responses.
 * @returns {Promise<void|FastifyReply>} Returns early with 401 Unauthorized response if token is invalid or missing.
 */
export const tokenMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
  const authHeader = request.headers.authorization;
  if (!authHeader) throw new AccessDeniedException();

  const token = authHeader.replace('Bearer ', '').trim();
  const secret = process.env.JWT_SECRET as string;

  try {
    const decoded = jwt.verify(token, secret) as any;
    const currentContext = AsyncHooksContext.getContext();
    const updatedContext = {
      ...currentContext,
      user: {
        id: decoded.id,
        companyId: decoded.companyId,
        name: decoded.name,
        resource: decoded.resource,
        position: decoded.position,
      }
    };

    return new Promise((resolve) => {
      AsyncHooksContext.runWithContext(updatedContext, () => {
        resolve(undefined);
      });
    });

  } catch (error) {
    throw new AccessDeniedException();
  }
};
