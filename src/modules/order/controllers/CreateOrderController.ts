import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateOrderBodyRequest, CreateOrderResponse } from '@modules/order/schemas/CreateOrderSchema'
import { CreateOrderTransformer } from '@modules/order/transformers/CreateOrderTransformer';
import { CreateOrderService } from '@modules/order/services/CreateOrderService';

@singleton()
export class CreateOrderController {
  constructor(
    private readonly transformer: CreateOrderTransformer,
    private readonly service: CreateOrderService
  ) {}

  handler = async (request: FastifyRequest<{ Body: CreateOrderBodyRequest }>, reply: FastifyReply): Promise<CreateOrderResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(201);
    return this.transformer.toApi(outputDTO);
  }  
}
