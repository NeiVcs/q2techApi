import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { DeleteMusicParamsRequest } from '@modules/music/schemas/DeleteMusicSchema'
import { DeleteMusicInputDTO } from '@modules/music/dto/DeleteMusicInputDTO';

@singleton()
export class DeleteMusicTransformer {
  public fromApi(request?: FastifyRequest<{ Params: DeleteMusicParamsRequest }>): DeleteMusicInputDTO {
    const { params } = request;

    return {
      id: params?.id
    };
  }
}
