import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { DeleteUserParamsRequest } from '@modules/user/schemas/DeleteUserSchema'
import { DeleteUserInputDTO } from "@modules/user/dto/DeleteUserInputDTO";
import { AsyncHooksContext } from '@shared/asyncHooks';

@singleton()
export class DeleteUserTransformer {
  public fromApi(request?: FastifyRequest<{ Params: DeleteUserParamsRequest }>): DeleteUserInputDTO {
    const { params } = request;
    const { user } = AsyncHooksContext.getContext();
    const { id } = user;

    return {
      id: params.id,
      userId: id,
    };
  }
}
