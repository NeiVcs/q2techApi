import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindAllMusicQueryRequest, FindAllMusicResponse } from '@modules/music/schemas/FindAllMusicSchema';
import { FindAllMusicInputDTO } from '@modules/music/dto/FindAllMusicInputDTO';
import { FindAllMusicOutputDTO } from '../dto/FindAllMusicOutputDTO';
import { MusicDTO } from '../dto/MusicDTO';

@singleton()
export class FindAllMusicTransformer {
  public fromApi(request?: FastifyRequest<{ Querystring: FindAllMusicQueryRequest }>): FindAllMusicInputDTO {
    const { query } = request;

    return {
      name: query?.name || '',
      category: query?.category || '',
      artist: query?.artist || '',
      gender: query?.gender || ''
    };
  }

  public toApi(outputDTO: FindAllMusicOutputDTO): FindAllMusicResponse {
    return {
      items: Array.isArray(outputDTO?.items)
        ? outputDTO.items.map((f) => ({
          id: f?.id ?? '',
          name: f?.name ?? '',
          category: f?.category ?? '',
          artist: f?.artist ?? '',
          gender: f?.gender ?? '',
          link: f?.link ?? ''
        }))
        : []
    };
  }

  public toDto(entity: MusicDTO[]): FindAllMusicOutputDTO {
    return {
      items: Array.isArray(entity)
        ? entity.map((f) => ({
          id: f?.id ?? '',
          name: f?.name ?? '',
          category: f?.category ?? '',
          artist: f?.artist ?? '',
          gender: f?.gender ?? '',
          link: f?.link ?? ''
        }))
        : []
    };
  }
}
