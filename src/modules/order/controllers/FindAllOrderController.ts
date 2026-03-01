import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindAllOrderQueryRequest, FindAllOrderResponse } from '@modules/order/schemas/FindAllOrderSchema'
import { FindAllOrderTransformer } from '@modules/order/transformers/FindAllOrderTransformer';
import { FindAllOrderService } from '@modules/order/services/FindAllOrderService';

@singleton()
export class FindAllOrderController {
  constructor(
    private readonly transformer: FindAllOrderTransformer,
    private readonly service: FindAllOrderService
  ) {}

  handler = async (request: FastifyRequest<{ Querystring: FindAllOrderQueryRequest }>, reply: FastifyReply): Promise<FindAllOrderResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
