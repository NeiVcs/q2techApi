import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from 'fastify';
import { FindBillPaymentsListQueryRequest, FindBillPaymentsListResponse } from '@modules/billPayments/schemas/FindBillPaymentsListSchema';
import { FindBillPaymentsListTransformer } from '@modules/billPayments/transformers/FindBillPaymentsListTransformer';
import { FindBillPaymentsListService } from '@modules/billPayments/services/FindBillPaymentsListService';

@singleton()
export class FindBillPaymentsListController {
  constructor(
    private readonly transformer: FindBillPaymentsListTransformer,
    private readonly service: FindBillPaymentsListService
  ) {}

  handler = async (request: FastifyRequest<{ Querystring: FindBillPaymentsListQueryRequest }>, reply: FastifyReply): Promise<FindBillPaymentsListResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  };
}
