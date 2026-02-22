import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { createProductController, findAllProductController } from ".";
import { CreateProductSchema } from "./schemas/CreateProductSchema";
import { FindAllProductSchema } from "./schemas/FindAllProductSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateProductRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.post('/v1/product', { schema: CreateProductSchema }, createProductController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/product', { schema: FindAllProductSchema }, findAllProductController().handler as RouteHandlerMethod);
};
