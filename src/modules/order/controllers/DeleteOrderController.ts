import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteOrderParamsRequest } from '@modules/order/schemas/DeleteOrderSchema'
import { DeleteOrderTransformer } from '@modules/order/transformers/DeleteOrderTransformer';
import { DeleteOrderService } from '@modules/order/services/DeleteOrderService';

@singleton()
export class DeleteOrderController {
  constructor(
    private readonly transformer: DeleteOrderTransformer,
    private readonly service: DeleteOrderService
  ) {}

  handler = async (request: FastifyRequest<{ Params: DeleteOrderParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);
    
    await this.service.execute(inputDTO);
    reply.code(204);
  }  
}
