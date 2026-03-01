import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { authMiddleware } from '@middlewares/authMiddleware';
import { privateMusicRoutesV1 } from './music';
import { privateAdditionalRoutesV1 } from './additional';
import { privateProductRoutesV1 } from './product';
import { privateCompanyRoutesV1 } from './company';
import { privateOrderRoutesV1 } from './order';

export const routesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.register(async (privateScope: FastifyInstance) => {
    privateScope.addHook('preHandler', authMiddleware);

    privateScope.register(privateMusicRoutesV1);

    privateScope.register(privateAdditionalRoutesV1);
    privateScope.register(privateProductRoutesV1);
    privateScope.register(privateCompanyRoutesV1);
    privateScope.register(privateOrderRoutesV1);
  });
};
