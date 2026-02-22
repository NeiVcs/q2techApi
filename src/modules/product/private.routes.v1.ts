import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { createProductController } from ".";
import { CreateProductSchema } from "./schemas/CreateProductSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateProductRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.post('/v1/product', { schema: CreateProductSchema }, createProductController().handler as RouteHandlerMethod);
};
