import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindByCompanyIdOrderParamsRequest, FindByCompanyIdOrderQueryRequest, FindByCompanyIdOrderResponse } from '@modules/order/schemas/FindByCompanyIdOrderSchema'
import { FindByCompanyIdOrderTransformer } from '@modules/order/transformers/FindByCompanyIdOrderTransformer';
import { FindByCompanyIdOrderService } from '@modules/order/services/FindByCompanyIdOrderService';

@singleton()
export class FindByCompanyIdOrderController {
  constructor(
    private readonly transformer: FindByCompanyIdOrderTransformer,
    private readonly service: FindByCompanyIdOrderService
  ) {}

  handler = async (request: FastifyRequest<{ Params: FindByCompanyIdOrderParamsRequest; Querystring: FindByCompanyIdOrderQueryRequest }>, reply: FastifyReply): Promise<FindByCompanyIdOrderResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
