import { FastifyInstance } from 'fastify';
import helmet from '@fastify/helmet';
import { fastifyCompress } from '@fastify/compress';

export const SecurityMiddleware = (fastifyInstance: FastifyInstance) => {
  fastifyInstance.register(helmet, {
    contentSecurityPolicy: false,
    frameguard: { action: 'deny' }
  });

  fastifyInstance.register(fastifyCompress, {
    global: true,
    encodings: ['br', 'gzip', 'deflate']
  });
};
