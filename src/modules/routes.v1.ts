import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { authMiddleware, tokenMiddleware } from '@middlewares/authMiddleware';
import { privateAdditionalRoutesV1, publicAdditionalRoutesV1 } from './additional';
import { privateProductRoutesV1, publicProductRoutesV1 } from './product';
import { privateCompanyRoutesV1, publicCompanyRoutesV1 } from './company';
import { privateOrderRoutesV1, publicOrderRoutesV1 } from './order';
import { privateUserRoutesV1, publicUserRoutesV1 } from './user';
import { privateAuthRoutesV1, publicAuthRoutesV1 } from './auth';

export const routesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.register(async (publicScope: FastifyInstance) => {
    publicScope.addHook('preHandler', authMiddleware);

    publicScope.register(publicAuthRoutesV1);
    publicScope.register(publicAdditionalRoutesV1);
    publicScope.register(publicProductRoutesV1);
    publicScope.register(publicCompanyRoutesV1);
    publicScope.register(publicOrderRoutesV1);
    publicScope.register(publicUserRoutesV1);
  });

  fastifyInstance.register(async (privateScope: FastifyInstance) => {
    privateScope.addHook('preHandler', authMiddleware);
    privateScope.addHook('preHandler', tokenMiddleware);

    privateScope.register(privateAuthRoutesV1);
    privateScope.register(privateAdditionalRoutesV1);
    privateScope.register(privateProductRoutesV1);
    privateScope.register(privateCompanyRoutesV1);
    privateScope.register(privateOrderRoutesV1);
    privateScope.register(privateUserRoutesV1);
  });
};
