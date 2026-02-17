import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { ListAllMusicsQueryRequest, ListAllMusicsResponse } from '@modules/musics/schemas/ListAllMusicsSchema'
import { ListAllMusicsTransformer } from '@modules/musics/transformers/ListAllMusicsTransformer';
import { ListAllMusicsService } from '@modules/musics/services/ListAllMusicsService';

@singleton()
export class ListAllMusicsController {
  constructor(private readonly transformer: ListAllMusicsTransformer,
              private readonly service: ListAllMusicsService) {}

  handler = async (request: FastifyRequest<{ Querystring: ListAllMusicsQueryRequest }>, reply: FastifyReply): Promise<ListAllMusicsResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }
  
}