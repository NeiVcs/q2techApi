import { FastifyInstance, FastifyPluginAsync } from 'fastify';
import { authMiddleware } from '@middlewares/authMiddleware';
import { privateBillPaymentsRoutesV1 } from '@modules/billPayments';

/**
 * Registers routes private and public for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const routesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  /*TODO: Register private routes*/
  fastifyInstance.register(async (privateScope: FastifyInstance) => {
    /*TODO: Middleware global, sempre executa primeiro que as rotas.*/
    privateScope.addHook('preHandler', authMiddleware);

    /*TODO: Register private routes of module bill payments*/
    privateScope.register(privateBillPaymentsRoutesV1);
  });

  /*TODO: Register public routes of module account*/
};
