import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { CreateMusicBodyRequest, CreateMusicResponse } from '@modules/music/schemas/CreateMusicSchema';
import { CreateMusicInputDTO } from '@modules/music/dto/CreateMusicInputDTO';
import { CreateMusicOutputDTO } from '@modules/music/dto/CreateMusicOutputDTO';

@singleton()
export class CreateMusicTransformer {
  public fromApi(request?: FastifyRequest<{ Body: CreateMusicBodyRequest }>): CreateMusicInputDTO {
    const { body } = request;

    return {
      name: body?.name || '',
      category: body?.category || '',
      artist: body?.artist || '',
      gender: body?.gender || '',
      link: body?.link || ''
    };
  }

  public toApi(outputDTO: CreateMusicOutputDTO): CreateMusicResponse {
    return {
      id: outputDTO?.id ?? ''
    };
  }
}
