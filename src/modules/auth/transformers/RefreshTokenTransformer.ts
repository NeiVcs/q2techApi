import { singleton } from 'tsyringe';
  import {FastifyRequest} from 'fastify';
  import { RefreshTokenBodyRequest, RefreshTokenResponse } from '@modules/auth/schemas/RefreshTokenSchema'
  import { RefreshTokenInputDTO } from "@modules/auth/dto/RefreshTokenInputDTO";
  import { RefreshTokenOutputDTO } from "@modules/auth/dto/RefreshTokenOutputDTO";
  

@singleton()
export class RefreshTokenTransformer {
  public fromApi(request?: FastifyRequest<{ Body: RefreshTokenBodyRequest }>): RefreshTokenInputDTO {
    const { body } = request;

    return {
       token: body?.token || '',
    };
  }

  public toApi(outputDTO: RefreshTokenOutputDTO): RefreshTokenResponse {
    return {
      token: outputDTO?.token ?? '',
    };
  }
}
  