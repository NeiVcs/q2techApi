import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindByIdOrderParamsRequest, FindByIdOrderResponse } from '@modules/order/schemas/FindByIdOrderSchema'
import { FindByIdOrderTransformer } from '@modules/order/transformers/FindByIdOrderTransformer';
import { FindByIdOrderService } from '@modules/order/services/FindByIdOrderService';

@singleton()
export class FindByIdOrderController {
  constructor(
    private readonly transformer: FindByIdOrderTransformer,
    private readonly service: FindByIdOrderService
  ) {}

  handler = async (request: FastifyRequest<{ Params: FindByIdOrderParamsRequest }>, reply: FastifyReply): Promise<FindByIdOrderResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
