import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { findAllOrderController, findByCompanyIdOrderController, findByIdOrderController, updateOrderController } from ".";
import { FindAllOrderSchema } from "./schemas/FindAllOrderSchema";
import { UpdateOrderSchema } from "./schemas/UpdateOrderSchema";
import { FindByCompanyIdOrderSchema } from "./schemas/FindByCompanyIdOrderSchema";
import { FindByIdOrderSchema } from "./schemas/FindByIdOrderSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateOrderRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.get('/v1/order', { schema: FindAllOrderSchema }, findAllOrderController().handler as RouteHandlerMethod);
  fastifyInstance.put('/v1/order/:id', { schema: UpdateOrderSchema }, updateOrderController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/order/:id', { schema: FindByIdOrderSchema }, findByIdOrderController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/order/company/:companyId', { schema: FindByCompanyIdOrderSchema }, findByCompanyIdOrderController().handler as RouteHandlerMethod);
};
