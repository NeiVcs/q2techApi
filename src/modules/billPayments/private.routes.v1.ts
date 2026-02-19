import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from 'fastify';
import {
  findBillPaymentsListController
}
  from '@modules/billPayments/index';
import { FindBillPaymentsListSchema } from '@modules/billPayments/schemas/FindBillPaymentsListSchema';

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateBillPaymentsRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.get('/v1/bill-payments/orders', { schema: FindBillPaymentsListSchema }, findBillPaymentsListController().handler as RouteHandlerMethod);
};
