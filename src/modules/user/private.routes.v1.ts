import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { CreateUserSchema } from "./schemas/CreateUserSchema";
import { createUserController, findAllUserController } from ".";
import { FindAllUserSchema } from "./schemas/FindAllUserSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateUserRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.post('/v1/user', { schema: CreateUserSchema }, createUserController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/user', { schema: FindAllUserSchema }, findAllUserController().handler as RouteHandlerMethod);
};
