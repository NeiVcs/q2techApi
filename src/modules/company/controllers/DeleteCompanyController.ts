import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteCompanyParamsRequest } from '@modules/company/schemas/DeleteCompanySchema'
import { DeleteCompanyTransformer } from '@modules/company/transformers/DeleteCompanyTransformer';
import { DeleteCompanyService } from '@modules/company/services/DeleteCompanyService';

@singleton()
export class DeleteCompanyController {
  constructor(
    private readonly transformer: DeleteCompanyTransformer,
    private readonly service: DeleteCompanyService
  ) {}

  handler = async (request: FastifyRequest<{ Params: DeleteCompanyParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);
    
    await this.service.execute(inputDTO);
    reply.code(204);
  }  
}
