import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { CreateUserSchema } from "./schemas/CreateUserSchema";
import { createUserController, deleteUserController, findAllUserController, findByIdUserController, updateUserController } from '.';
import { FindAllUserSchema } from "./schemas/FindAllUserSchema";
import { FindByIdUserSchema } from '@modules/user/schemas/FindByIdUserSchema';
import { UpdateUserSchema } from "./schemas/UpdateUserSchema";
import { DeleteUserSchema } from "./schemas/DeleteUserSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateUserRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.post('/v1/user', { schema: CreateUserSchema }, createUserController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/user', { schema: FindAllUserSchema }, findAllUserController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/user/:id', { schema: FindByIdUserSchema }, findByIdUserController().handler as RouteHandlerMethod);
  fastifyInstance.put('/v1/user/:id', { schema: UpdateUserSchema }, updateUserController().handler as RouteHandlerMethod);
  fastifyInstance.delete('/v1/user/:id', { schema: DeleteUserSchema }, deleteUserController().handler as RouteHandlerMethod);
};
