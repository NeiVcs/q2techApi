import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { FindByIdOrderSchema } from "./schemas/FindByIdOrderSchema";
import { FindByCompanyIdOrderSchema } from "./schemas/FindByCompanyIdOrderSchema";
import { findByCompanyIdOrderController, findByIdOrderController } from ".";

/**
 * Registers public routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const publicOrderRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.get('/v1/order/:id', { schema: FindByIdOrderSchema }, findByIdOrderController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/order/company/:companyId', { schema: FindByCompanyIdOrderSchema }, findByCompanyIdOrderController().handler as RouteHandlerMethod);
};
