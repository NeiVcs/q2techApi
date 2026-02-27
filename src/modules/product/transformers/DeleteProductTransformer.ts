import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { DeleteProductParamsRequest } from '@modules/product/schemas/DeleteProductSchema'
import { DeleteProductInputDTO } from "@modules/product/dto/DeleteProductInputDTO";

@singleton()
export class DeleteProductTransformer {
  public fromApi(request?: FastifyRequest<{ Params: DeleteProductParamsRequest }>): DeleteProductInputDTO {
    const { params } = request;

    return {
      id: params.id,
    };
  }
}
