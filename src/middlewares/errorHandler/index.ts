import { FastifyError, FastifyReply, FastifyRequest } from 'fastify';
import { RestAuditLog } from '@middlewares/registerLogger/types';
import { logger } from '@shared/logger';
import { BaseAbstractException } from '@shared/exceptions/BaseAbstractException';
import { CodeErrors } from '@shared/exceptions';
import { BaseErrorType } from '@shared/exceptions/codeError/types';

type ResponseType = {
  statusCode: number;
  responseBody: { errors: BaseErrorType[] };
};

const mapErrorToResponse = (error: FastifyError): ResponseType => {
  if (error instanceof BaseAbstractException) {
    return {
      statusCode: error.statusCode,
      responseBody: { errors: error.errors }
    };
  }

  if (error.validation && Boolean(error.validation) && error.code) {
    return {
      statusCode: 400,
      responseBody: {
        errors: error.validation.map((m) => ({
          code: CodeErrors.CODE_ERROR_FIELDS_INVALID.code,
          message: m.message
        }))
      }
    };
  }

  if (error.code && error.code === 'FST_INVALID_MULTIPART_CONTENT_TYPE') {
    return {
      statusCode: 400,
      responseBody: {
        errors: [
          {
            code: CodeErrors.CODE_ERROR_FIELDS_INVALID.code,
            message: 'A solicitação não é multiparte.'
          }
        ]
      }
    };
  }

  return {
    statusCode: 500,
    responseBody: {
      errors: [
        {
          code: CodeErrors.CODE_ERROR_SERVER_INTERNAL_ERROR.code,
          message: CodeErrors.CODE_ERROR_SERVER_INTERNAL_ERROR.message
        }
      ]
    }
  };
};

export const ErrorHandler = (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
  const { statusCode, responseBody } = mapErrorToResponse(error);

  const restAuditLog: RestAuditLog = {
    logType: 'AUDIT_LOG_REST',
    method: `${request.method} ${request.routeOptions.url}`,
    originalMethod: `${request.method} ${request.originalUrl}`,
    statusCode: statusCode,
    parameters: request.params || {},
    query: request.query || {},
    headers: request.headers || {},
    requestBody: request.body || {},
    responseBody: responseBody,
    stackError: error?.stack || null,
    elapsedTime: reply.elapsedTime ? Number(reply.elapsedTime.toFixed(4)) : 0.0
  };

  logger.error(restAuditLog);

  reply.code(statusCode);
  return responseBody;
};
