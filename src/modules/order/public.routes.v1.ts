import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { createOrderController, deleteOrderController, findByUserIdOrderController } from ".";
import { FindByUserIdOrderSchema } from "./schemas/FindByUserIdOrderSchema";
import { DeleteOrderSchema } from "./schemas/DeleteOrderSchema";
import { CreateOrderSchema } from "./schemas/CreateOrderSchema";

/**
 * Registers public routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const publicOrderRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.post('/v1/order', { schema: CreateOrderSchema }, createOrderController().handler as RouteHandlerMethod);
    fastifyInstance.delete('/v1/order/:id', { schema: DeleteOrderSchema }, deleteOrderController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/order/company/:companyId/user', { schema: FindByUserIdOrderSchema }, findByUserIdOrderController().handler as RouteHandlerMethod);
};
