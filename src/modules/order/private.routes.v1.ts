import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { CreateOrderSchema } from "./schemas/CreateOrderSchema";
import { createOrderController, findAllOrderController } from ".";
import { FindAllOrderSchema } from "./schemas/FindAllOrderSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateOrderRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.post('/v1/order', { schema: CreateOrderSchema }, createOrderController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/order', { schema: FindAllOrderSchema }, findAllOrderController().handler as RouteHandlerMethod);
};
