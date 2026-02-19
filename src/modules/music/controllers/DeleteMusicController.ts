import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteMusicBodyRequest } from '@modules/music/schemas/DeleteMusicSchema'
import { DeleteMusicTransformer } from '@modules/music/transformers/DeleteMusicTransformer';
import { DeleteMusicService } from '@modules/music/services/DeleteMusicService';

@singleton()
export class DeleteMusicController {
  constructor(
    private readonly transformer: DeleteMusicTransformer,
    private readonly service: DeleteMusicService
  ) { }

  handler = async (request: FastifyRequest<{ Params: DeleteMusicBodyRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);
    await this.service.execute(inputDTO);
    reply.code(204);
  }
}
