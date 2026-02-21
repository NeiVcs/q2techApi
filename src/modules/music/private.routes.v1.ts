import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from 'fastify';
import { FindAllMusicSchema } from './schemas/FindAllMusicSchema';
import { createMusicController, deleteMusicController, findAllMusicController, findByIdMusicController, updateMusicController } from './index';
import { CreateMusicSchema } from './schemas/CreateMusicSchema';
import { UpdateMusicSchema } from './schemas/UpdateMusicSchema';
import { DeleteMusicSchema } from './schemas/DeleteMusicSchema';
import { FindByIdMusicSchema } from '@modules/music/schemas/FindByIdMusicSchema';

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateMusicRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.post('/v1/music', { schema: CreateMusicSchema }, createMusicController().handler as RouteHandlerMethod);
  fastifyInstance.delete('/v1/music/:id', { schema: DeleteMusicSchema }, deleteMusicController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/music', { schema: FindAllMusicSchema }, findAllMusicController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/music/:id', { schema: FindByIdMusicSchema }, findByIdMusicController().handler as RouteHandlerMethod);
  fastifyInstance.put('/v1/music/:id', { schema: UpdateMusicSchema }, updateMusicController().handler as RouteHandlerMethod);
};
