import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { RefreshTokenSchema } from "./schemas/RefreshTokenSchema";
import { refreshTokenController } from ".";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateAuthRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.post('/v1/refresh-token', { schema: RefreshTokenSchema }, refreshTokenController().handler as RouteHandlerMethod);
};
