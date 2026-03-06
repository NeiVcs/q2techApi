import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { CreateUserSchema } from "./schemas/CreateUserSchema";
import { createUserController } from ".";

/**
 * Registers public routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const publicUserRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.post('/v1/user', { schema: CreateUserSchema }, createUserController().handler as RouteHandlerMethod);
};
