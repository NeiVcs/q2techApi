import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { authMiddleware } from '@middlewares/authMiddleware';
import { privateMusicRoutesV1 } from './music';

export const routesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.register(async (privateScope: FastifyInstance) => {
    privateScope.addHook('preHandler', authMiddleware);

    privateScope.register(privateMusicRoutesV1);
  });
};
