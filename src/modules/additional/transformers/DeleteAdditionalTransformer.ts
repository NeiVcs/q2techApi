import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { DeleteAdditionalParamsRequest } from '@modules/additional/schemas/DeleteAdditionalSchema'
import { DeleteAdditionalInputDTO } from "@modules/additional/dto/DeleteAdditionalInputDTO";

@singleton()
export class DeleteAdditionalTransformer {
  public fromApi(request?: FastifyRequest<{ Params: DeleteAdditionalParamsRequest }>): DeleteAdditionalInputDTO {
    const { params } = request;

    return {
      id: params.id,
    };
  }
}
