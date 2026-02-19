import { FastifyRequest } from 'fastify/types/request';
import { FastifyReply } from 'fastify/types/reply';
import { CodeErrors } from '@shared/exceptions';

export const NotFoundHandler = async (_: FastifyRequest, reply: FastifyReply) => {
  reply.code(404);
  return {
    errors: [CodeErrors.CODE_ERROR_NOT_FOUND]
  };
};
