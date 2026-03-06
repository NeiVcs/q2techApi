import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { FindAllAdditionalSchema } from "./schemas/FindAllAdditionalSchema";
import { FindByIdAdditionalSchema } from "./schemas/FindByIdAdditionalSchema";
import { findAllAdditionalController, findByIdAdditionalController } from ".";

/**
 * Registers public routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const publicAdditionalRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.get('/v1/additional', { schema: FindAllAdditionalSchema }, findAllAdditionalController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/additional/:id', { schema: FindByIdAdditionalSchema }, findByIdAdditionalController().handler as RouteHandlerMethod);
};
