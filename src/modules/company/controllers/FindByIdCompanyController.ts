import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindByIdCompanyParamsRequest, FindByIdCompanyResponse } from '@modules/company/schemas/FindByIdCompanySchema'
import { FindByIdCompanyTransformer } from '@modules/company/transformers/FindByIdCompanyTransformer';
import { FindByIdCompanyService } from '@modules/company/services/FindByIdCompanyService';

@singleton()
export class FindByIdCompanyController {
  constructor(
    private readonly transformer: FindByIdCompanyTransformer,
    private readonly service: FindByIdCompanyService
  ) {}

  handler = async (request: FastifyRequest<{ Params: FindByIdCompanyParamsRequest }>, reply: FastifyReply): Promise<FindByIdCompanyResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
