import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindByCompanyIdTableStatusParamsRequest, FindByCompanyIdTableStatusResponse } from '@modules/tableStatus/schemas/FindByCompanyIdTableStatusSchema'
import { FindByCompanyIdTableStatusTransformer } from '@modules/tableStatus/transformers/FindByCompanyIdTableStatusTransformer';
import { FindByCompanyIdTableStatusService } from '@modules/tableStatus/services/FindByCompanyIdTableStatusService';

@singleton()
export class FindByCompanyIdTableStatusController {
  constructor(
    private readonly transformer: FindByCompanyIdTableStatusTransformer,
    private readonly service: FindByCompanyIdTableStatusService
  ) { }

  handler = async (request: FastifyRequest<{ Params: FindByCompanyIdTableStatusParamsRequest }>, reply: FastifyReply): Promise<FindByCompanyIdTableStatusResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);

    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }
}
