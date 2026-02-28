import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindAllCompanyQueryRequest, FindAllCompanyResponse } from '@modules/company/schemas/FindAllCompanySchema'
import { FindAllCompanyTransformer } from '@modules/company/transformers/FindAllCompanyTransformer';
import { FindAllCompanyService } from '@modules/company/services/FindAllCompanyService';

@singleton()
export class FindAllCompanyController {
  constructor(
    private readonly transformer: FindAllCompanyTransformer,
    private readonly service: FindAllCompanyService
  ) {}

  handler = async (request: FastifyRequest<{ Querystring: FindAllCompanyQueryRequest }>, reply: FastifyReply): Promise<FindAllCompanyResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
