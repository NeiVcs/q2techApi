import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { FindAllImagesSchema } from "./schemas/FindAllImagesSchema";
import { deleteImageController, findAllImagesController } from ".";
import { DeleteImageSchema } from "./schemas/DeleteImageSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateCloudinaryRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.get('/v1/images', { schema: FindAllImagesSchema }, findAllImagesController().handler as RouteHandlerMethod);
  fastifyInstance.delete('/v1/images/:id', { schema: DeleteImageSchema }, deleteImageController().handler as RouteHandlerMethod);
};
