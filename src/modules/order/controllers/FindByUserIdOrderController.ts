import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindByUserIdOrderParamsRequest, FindByUserIdOrderQueryRequest, FindByUserIdOrderResponse } from '@modules/order/schemas/FindByUserIdOrderSchema'
import { FindByUserIdOrderTransformer } from '@modules/order/transformers/FindByUserIdOrderTransformer';
import { FindByUserIdOrderService } from '@modules/order/services/FindByUserIdOrderService';

@singleton()
export class FindByUserIdOrderController {
  constructor(
    private readonly transformer: FindByUserIdOrderTransformer,
    private readonly service: FindByUserIdOrderService
  ) {}

  handler = async (request: FastifyRequest<{ Params: FindByUserIdOrderParamsRequest; Querystring: FindByUserIdOrderQueryRequest }>, reply: FastifyReply): Promise<FindByUserIdOrderResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
