import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { FindAllProductSchema } from "./schemas/FindAllProductSchema";
import { FindByCompanyIdProductSchema } from "./schemas/FindByCompanyIdProductSchema";
import { FindByIdProductSchema } from "./schemas/FindByIdProductSchema";
import { findAllProductController, findByCompanyIdProductController, findByIdProductController } from ".";

/**
 * Registers public routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const publicProductRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.get('/v1/product', { schema: FindAllProductSchema }, findAllProductController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/product/company/:id', { schema: FindByCompanyIdProductSchema }, findByCompanyIdProductController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/product/:id', { schema: FindByIdProductSchema }, findByIdProductController().handler as RouteHandlerMethod);
};
