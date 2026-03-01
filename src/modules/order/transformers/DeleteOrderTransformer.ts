import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { DeleteOrderParamsRequest } from '@modules/order/schemas/DeleteOrderSchema'
import { DeleteOrderInputDTO } from "@modules/order/dto/DeleteOrderInputDTO";



@singleton()
export class DeleteOrderTransformer {
  public fromApi(request?: FastifyRequest<{ Params: DeleteOrderParamsRequest }>): DeleteOrderInputDTO {
    const { params } = request;

    return {
      id: params.id,
    };
  }
}
