import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { UpdateMusicBodyRequest, UpdateMusicParamsRequest, UpdateMusicResponse } from '@modules/music/schemas/UpdateMusicSchema'
import { UpdateMusicInputDTO } from "@modules/music/dto/UpdateMusicInputDTO";
import { UpdateMusicOutputDTO } from "@modules/music/dto/UpdateMusicOutputDTO";

@singleton()
export class UpdateMusicTransformer {
  public fromApi(request?: FastifyRequest<{ Body: UpdateMusicBodyRequest, Params: UpdateMusicParamsRequest }>): UpdateMusicInputDTO {
    const { params, body } = request;

    return {
      id: params?.id || '',
      name: body?.name || '',
      category: body?.category || '',
      artist: body?.artist || '',
      gender: body?.gender || '',
      link: body?.link || '',
    };
  }

  public toApi(outputDTO: UpdateMusicOutputDTO): UpdateMusicResponse {
    return {
      id: outputDTO?.id ?? '',
    };
  }
}
