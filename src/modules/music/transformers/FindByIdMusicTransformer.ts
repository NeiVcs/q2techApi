import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindByIdMusicParamsRequest, FindByIdMusicResponse } from '@modules/music/schemas/FindByIdMusicSchema';
import { FindByIdMusicInputDTO } from '@modules/music/dto/FindByIdMusicInputDTO';
import { MusicDTOFix } from '@modules/music/dto/MusicDTOFix';

@singleton()
export class FindByIdMusicTransformer {
  public fromApi(request?: FastifyRequest<{ Params: FindByIdMusicParamsRequest }>): FindByIdMusicInputDTO {
    const { params } = request;

    return {
      id: params.id
    };
  }

  public toApi(outputDTO: MusicDTOFix): FindByIdMusicResponse {
    return {
      id: outputDTO?.id ?? '',
      name: outputDTO?.name ?? '',
      category: outputDTO?.category ?? '',
      artist: outputDTO?.artist ?? '',
      gender: outputDTO?.gender ?? '',
      link: outputDTO?.link ?? ''
    };
  }

  public toDto(entity: MusicDTOFix): MusicDTOFix {
    return {
      id: entity?.id ?? '',
      name: entity?.name ?? '',
      category: entity?.category ?? '',
      artist: entity?.artist ?? '',
      gender: entity?.gender ?? '',
      link: entity?.link ?? ''
    };
  }
}
