import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { UpdateUserPasswordBodyRequest } from '@modules/user/schemas/UpdateUserPasswordSchema'
import { UpdateUserPasswordInputDTO } from "@modules/user/dto/UpdateUserPasswordInputDTO";
@singleton()

export class UpdateUserPasswordTransformer {
  public fromApi(request?: FastifyRequest<{ Body: UpdateUserPasswordBodyRequest }>): UpdateUserPasswordInputDTO {
    const { body } = request;

    return {
      email: body?.email || '',
      password: body?.password || '',
      newPassword: body?.newPassword || '',
      code: body?.code || '',
    };
  }
}
