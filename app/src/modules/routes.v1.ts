import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { authMiddleware } from '@middlewares/authMiddleware';
import { privateBillPaymentsRoutesV1 } from '@modules/billPayments';
import { privateMusicsRoutesV1 } from './musics';

export const routesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.register(async (privateScope: FastifyInstance) => {
    privateScope.addHook('preHandler', authMiddleware);

    privateScope.register(privateBillPaymentsRoutesV1);
    privateScope.register(privateMusicsRoutesV1);
  });
};
