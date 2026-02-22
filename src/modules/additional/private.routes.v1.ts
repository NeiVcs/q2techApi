import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { CreateAdditionalSchema } from "./schemas/CreateAdditionalSchema";
import { createAdditionalController, deleteAdditionalController, findAllAdditionalController, findByIdAdditionalController, updateAdditionalController } from ".";
import { DeleteAdditionalSchema } from "./schemas/DeleteAdditionalSchema";
import { FindAllAdditionalSchema } from "./schemas/FindAllAdditionalSchema";
import { FindByIdAdditionalSchema } from "./schemas/FindByIdAdditionalSchema";
import { UpdateAdditionalSchema } from "./schemas/UpdateAdditionalSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateAdditionalRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.post('/v1/additional', { schema: CreateAdditionalSchema }, createAdditionalController().handler as RouteHandlerMethod);
    fastifyInstance.delete('/v1/additional/:id', { schema: DeleteAdditionalSchema }, deleteAdditionalController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/additional', { schema: FindAllAdditionalSchema }, findAllAdditionalController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/additional/:id', { schema: FindByIdAdditionalSchema }, findByIdAdditionalController().handler as RouteHandlerMethod);
    fastifyInstance.put('/v1/additional/:id', { schema: UpdateAdditionalSchema }, updateAdditionalController().handler as RouteHandlerMethod);
};
