import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from 'fastify';
import { FindByIdMusicParamsRequest, FindByIdMusicResponse } from '@modules/music/schemas/FindByIdMusicSchema';
import { FindByIdMusicTransformer } from '@modules/music/transformers/FindByIdMusicTransformer';
import { FindByIdMusicService } from '@modules/music/services/FindByIdMusicService';

@singleton()
export class FindByIdMusicController {
  constructor(
    private readonly transformer: FindByIdMusicTransformer,
    private readonly service: FindByIdMusicService
  ) {}

  handler = async (request: FastifyRequest<{ Params: FindByIdMusicParamsRequest }>, reply: FastifyReply): Promise<FindByIdMusicResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  };
}
