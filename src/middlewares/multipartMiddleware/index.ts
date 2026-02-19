import { FastifyInstance } from 'fastify';
import multipart from '@fastify/multipart';
import { envConfig } from '@config/env';

export const MultipartMiddleware = (fastifyInstance: FastifyInstance) => {
  fastifyInstance.register(multipart, {
    limits: {
      fileSize: envConfig.FILE_LIMIT_UPLOAD
    }
  });
};
