import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindByUrlCompanyParamsRequest, FindByUrlCompanyResponse } from '@modules/company/schemas/FindByUrlCompanySchema'
import { FindByUrlCompanyTransformer } from '@modules/company/transformers/FindByUrlCompanyTransformer';
import { FindByUrlCompanyService } from '@modules/company/services/FindByUrlCompanyService';

@singleton()
export class FindByUrlCompanyController {
  constructor(
    private readonly transformer: FindByUrlCompanyTransformer,
    private readonly service: FindByUrlCompanyService
  ) {}

  handler = async (request: FastifyRequest<{ Params: FindByUrlCompanyParamsRequest }>, reply: FastifyReply): Promise<FindByUrlCompanyResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
