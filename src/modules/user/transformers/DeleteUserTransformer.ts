import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { DeleteUserParamsRequest } from '@modules/user/schemas/DeleteUserSchema'
import { DeleteUserInputDTO } from "@modules/user/dto/DeleteUserInputDTO";

@singleton()
export class DeleteUserTransformer {
  public fromApi(request?: FastifyRequest<{ Params: DeleteUserParamsRequest }>): DeleteUserInputDTO {
    const { params } = request;

    //const secret = process.env.JWT_SECRET;
    //const decoded = jwt.verify(inputDTO.token, secret) as any;

    return {
      id: params.id,
    };
  }
}
