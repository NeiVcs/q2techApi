import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { FindAllMusicSchema } from "./schemas/FindAllMusicSchema";
import { createMusicController, findAllMusicController } from ".";
import { CreateMusicSchema } from "./schemas/CreateMusicSchema";


/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateMusicRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.get('/v1/musics', { schema: FindAllMusicSchema }, findAllMusicController().handler as RouteHandlerMethod);
    fastifyInstance.post('/v1/musics', { schema: CreateMusicSchema }, createMusicController().handler as RouteHandlerMethod);
};
