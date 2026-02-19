import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindAllMusicQueryRequest, FindAllMusicResponse } from '@modules/music/schemas/FindAllMusicSchema'
import { FindAllMusicTransformer } from '@modules/music/transformers/FindAllMusicTransformer';
import { FindAllMusicService } from '@modules/music/services/FindAllMusicService';

@singleton()
export class FindAllMusicController {
  constructor(private readonly transformer: FindAllMusicTransformer,
    private readonly service: FindAllMusicService) { }

  handler = async (request: FastifyRequest<{ Querystring: FindAllMusicQueryRequest }>, reply: FastifyReply): Promise<FindAllMusicResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }
}
