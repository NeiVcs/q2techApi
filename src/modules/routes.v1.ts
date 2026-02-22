import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { authMiddleware } from '@middlewares/authMiddleware';
import { privateMusicRoutesV1 } from './music';
import { privateAdditionalRoutesV1 } from './additional';
import { privateProductRoutesV1 } from './product';

export const routesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.register(async (privateScope: FastifyInstance) => {
    privateScope.addHook('preHandler', authMiddleware);

    privateScope.register(privateMusicRoutesV1);

    privateScope.register(privateAdditionalRoutesV1);
    privateScope.register(privateProductRoutesV1);
  });
};
