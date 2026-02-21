import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { CreateAdditionalSchema } from "./schemas/CreateAdditionalSchema";
import { createAdditionalController } from ".";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateAdditionalRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.post('/v1/additional', { schema: CreateAdditionalSchema }, createAdditionalController().handler as RouteHandlerMethod);
};
