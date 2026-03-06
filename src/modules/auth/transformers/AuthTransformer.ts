import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { AuthBodyRequest, AuthResponse } from '@modules/auth/schemas/AuthSchema'
import { AuthInputDTO } from "@modules/auth/dto/AuthInputDTO";
import { AuthOutputDTO } from "@modules/auth/dto/AuthOutputDTO";

@singleton()
export class AuthTransformer {
  public fromApi(request?: FastifyRequest<{ Body: AuthBodyRequest }>): AuthInputDTO {
    const { body } = request;

    return {
      email: body?.email || '',
      password: body?.password || '',
    };
  }

  public toApi(outputDTO: AuthOutputDTO): AuthResponse {
    return {
      token: outputDTO?.token ?? '',
    };
  }
}
