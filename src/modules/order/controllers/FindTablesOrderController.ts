import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindTablesOrderParamsRequest, FindTablesOrderResponse } from '@modules/order/schemas/FindTablesOrderSchema'
import { FindTablesOrderTransformer } from '@modules/order/transformers/FindTablesOrderTransformer';
import { FindTablesOrderService } from '@modules/order/services/FindTablesOrderService';

@singleton()
export class FindTablesOrderController {
  constructor(
    private readonly transformer: FindTablesOrderTransformer,
    private readonly service: FindTablesOrderService
  ) { }

  handler = async (request: FastifyRequest<{ Params: FindTablesOrderParamsRequest }>, reply: FastifyReply): Promise<FindTablesOrderResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }
}
