import { singleton } from 'tsyringe';
import { z } from 'zod/v4';
import { FastifyRequest } from 'fastify';
import { ListAllMusicsQueryRequest, ListAllMusicsResponse } from '@modules/musics/schemas/ListAllMusicsSchema'
import { ListAllMusicsInputDTO } from "@modules/musics/dto/ListAllMusicsInputDTO";
import { ListAllMusicsOutputDTO } from "@modules/musics/dto/ListAllMusicsOutputDTO";


//TODO: Validação opcional usar apenas quando necessário para validações mais complexas.

const requestQuerySchema = z.object({});

@singleton()
export class ListAllMusicsTransformer {
  public fromApi(request?: FastifyRequest<{ Querystring: ListAllMusicsQueryRequest }>): ListAllMusicsInputDTO {
    const { query } = request;

    //validateRequest(requestParamsSchema, query); //TODO: Validação opcional usar apenas quando necessário para validações mais complexas.

    return {
      status: query?.status || '',
    };
  }

  public toApi(outputDTO: ListAllMusicsOutputDTO): ListAllMusicsResponse {
    return {
      items: Array.isArray(outputDTO?.items) ? outputDTO.items.map(f => ({
        id: f?.id ?? '',
        name: f?.name ?? '',
        category: f?.category ?? '',
        artist: f?.artist ?? '',
        gender: f?.gender ?? '',
        link: f?.link ?? '',
      })) : [],
    };
  }
}