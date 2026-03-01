import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindByUrlCompanyTransformer } from '../transformers/FindByUrlCompanyTransformer';
import { FindByUrlCompanyService } from '../services/FindByUrlCompanyService';
import { FindByUrlCompanyParamsRequest, FindByUrlCompanyResponse } from '../schemas/FindUrlCompanySchema';

@singleton()
export class FindByUrlCompanyController {
  constructor(
    private readonly transformer: FindByUrlCompanyTransformer,
    private readonly service: FindByUrlCompanyService
  ) { }

  handler = async (request: FastifyRequest<{ Params: FindByUrlCompanyParamsRequest }>, reply: FastifyReply): Promise<FindByUrlCompanyResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }
}
