import { singleton } from 'tsyringe';
import { z } from 'zod/v4';
import { FastifyRequest } from 'fastify';
import { FindAllMusicQueryRequest, FindAllMusicResponse } from '@modules/music/schemas/FindAllMusicSchema'
import { FindAllMusicInputDTO } from "@modules/music/dto/FindAllMusicInputDTO";
import { FindAllMusicOutputDTO } from '../dto/FindAllMusicOutputDTO';


//TODO: Validação opcional usar apenas quando necessário para validações mais complexas.

const requestQuerySchema = z.object({});

@singleton()
export class FindAllMusicTransformer {
  public fromApi(request?: FastifyRequest<{ Querystring: FindAllMusicQueryRequest }>): FindAllMusicInputDTO {
    const { query } = request;

    //validateRequest(requestParamsSchema, query); //TODO: Validação opcional usar apenas quando necessário para validações mais complexas.

    return {
      status: query?.status || '',
    };
  }

  public toApi(outputDTO: FindAllMusicOutputDTO): FindAllMusicResponse {
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

  public toDto(outputDTO: FindAllMusicOutputDTO): FindAllMusicResponse {
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
