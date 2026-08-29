import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { deleteUserController, findAllUserController, findByIdUserController, requestUserDeletionController, updateUserController } from '.';
import { FindAllUserSchema } from "./schemas/FindAllUserSchema";
import { FindByIdUserSchema } from '@modules/user/schemas/FindByIdUserSchema';
import { UpdateUserSchema } from "./schemas/UpdateUserSchema";
import { DeleteUserSchema } from "./schemas/DeleteUserSchema";
import { RequestUserDeletionSchema } from "./schemas/RequestUserDeletionSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateUserRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.get('/v1/user', { schema: FindAllUserSchema }, findAllUserController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/user/:id', { schema: FindByIdUserSchema }, findByIdUserController().handler as RouteHandlerMethod);
  fastifyInstance.put('/v1/user/:id', { schema: UpdateUserSchema }, updateUserController().handler as RouteHandlerMethod);
  fastifyInstance.delete('/v1/user/:id', { schema: DeleteUserSchema }, deleteUserController().handler as RouteHandlerMethod);
  fastifyInstance.post('/v1/user/delete', { schema: RequestUserDeletionSchema }, requestUserDeletionController().handler as RouteHandlerMethod);
};
