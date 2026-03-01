import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { CreateOrderSchema } from "./schemas/CreateOrderSchema";
import { createOrderController, findAllOrderController, findByCompanyIdOrderController, findByIdOrderController } from ".";
import { FindAllOrderSchema } from "./schemas/FindAllOrderSchema";
import { FindByIdOrderSchema } from "./schemas/FindByIdOrderSchema";
import { FindByCompanyIdOrderSchema } from "./schemas/FindByCompanyIdOrderSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateOrderRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.post('/v1/order', { schema: CreateOrderSchema }, createOrderController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/order', { schema: FindAllOrderSchema }, findAllOrderController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/order/:id', { schema: FindByIdOrderSchema }, findByIdOrderController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/order/company/:companyId', { schema: FindByCompanyIdOrderSchema }, findByCompanyIdOrderController().handler as RouteHandlerMethod);
};
