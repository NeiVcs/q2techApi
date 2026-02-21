import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { authMiddleware } from '@middlewares/authMiddleware';
import { privateMusicRoutesV1 } from './music';
import { privateAdditionalRoutesV1 } from './additional';

export const routesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.register(async (privateScope: FastifyInstance) => {
    privateScope.addHook('preHandler', authMiddleware);

    privateScope.register(privateMusicRoutesV1);

    privateScope.register(privateAdditionalRoutesV1);
  });
};
