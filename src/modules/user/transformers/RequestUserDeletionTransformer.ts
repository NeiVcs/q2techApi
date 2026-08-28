import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { RequestUserDeletionBodyRequest } from '@modules/user/schemas/RequestUserDeletionSchema'
import { RequestUserDeletionInputDTO } from "@modules/user/dto/RequestUserDeletionInputDTO";
import { AsyncHooksContext } from '@shared/asyncHooks';



@singleton()
export class RequestUserDeletionTransformer {
  public fromApi(request?: FastifyRequest<{ Body: RequestUserDeletionBodyRequest }>): RequestUserDeletionInputDTO {
    const { body } = request;

    const { user } = AsyncHooksContext.getContext();
    const { id } = user;

    return {
      password: body?.password || '',
      userId: id,
    };
  }
}
