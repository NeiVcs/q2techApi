import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateOrderBodyRequest, UpdateOrderParamsRequest } from '@modules/order/schemas/UpdateOrderSchema'
import { UpdateOrderTransformer } from '@modules/order/transformers/UpdateOrderTransformer';
import { UpdateOrderService } from '@modules/order/services/UpdateOrderService';

@singleton()
export class UpdateOrderController {
  constructor(
    private readonly transformer: UpdateOrderTransformer,
    private readonly service: UpdateOrderService
  ) {}

  handler = async (request: FastifyRequest<{ Body: UpdateOrderBodyRequest; Params: UpdateOrderParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);
    
    await this.service.execute(inputDTO);
    reply.code(204);
  }  
}
