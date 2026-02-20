import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from 'fastify';
import { UpdateMusicBodyRequest, UpdateMusicParamsRequest } from '@modules/music/schemas/UpdateMusicSchema'
import { UpdateMusicTransformer } from '@modules/music/transformers/UpdateMusicTransformer';
import { UpdateMusicService } from '@modules/music/services/UpdateMusicService';

@singleton()
export class UpdateMusicController {
  constructor(
    private readonly transformer: UpdateMusicTransformer,
    private readonly service: UpdateMusicService
  ) { }

  handler = async (request: FastifyRequest<{ Body: UpdateMusicBodyRequest, Params: UpdateMusicParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);

    await this.service.execute(inputDTO);
    reply.code(204);
  };
}
