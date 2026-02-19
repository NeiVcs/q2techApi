import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateMusicBodyRequest, CreateMusicResponse } from '@modules/music/schemas/CreateMusicSchema'
import { CreateMusicTransformer } from '@modules/music/transformers/CreateMusicTransformer';
import { CreateMusicService } from '@modules/music/services/CreateMusicService';

@singleton()
export class CreateMusicController {
  constructor(
    private readonly transformer: CreateMusicTransformer,
    private readonly service: CreateMusicService
  ) {}

  handler = async (request: FastifyRequest<{ Body: CreateMusicBodyRequest }>, reply: FastifyReply): Promise<CreateMusicResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(201);
    return this.transformer.toApi(outputDTO);
  };
}
