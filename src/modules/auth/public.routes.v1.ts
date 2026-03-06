import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { AuthSchema } from "./schemas/AuthSchema";
import { authController } from ".";

/**
 * Registers public routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const publicAuthRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.post('/v1/auth', { schema: AuthSchema }, authController().handler as RouteHandlerMethod);
};
