import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { ListAllMusicsSchema } from "./schemas/ListAllMusicsSchema";
import { listAllMusicsController } from ".";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateMusicsRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.get('/v1/musics', { schema: ListAllMusicsSchema }, listAllMusicsController().handler as RouteHandlerMethod);
};
