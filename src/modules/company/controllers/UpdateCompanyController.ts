import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateCompanyBodyRequest, UpdateCompanyParamsRequest } from '@modules/company/schemas/UpdateCompanySchema'
import { UpdateCompanyTransformer } from '@modules/company/transformers/UpdateCompanyTransformer';
import { UpdateCompanyService } from '@modules/company/services/UpdateCompanyService';

@singleton()
export class UpdateCompanyController {
  constructor(
    private readonly transformer: UpdateCompanyTransformer,
    private readonly service: UpdateCompanyService
  ) {}

  handler = async (request: FastifyRequest<{ Body: UpdateCompanyBodyRequest; Params: UpdateCompanyParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);
    
    await this.service.execute(inputDTO);
    reply.code(204);
  }  
}
