import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateCompanyBodyRequest, CreateCompanyResponse } from '@modules/company/schemas/CreateCompanySchema'
import { CreateCompanyTransformer } from '@modules/company/transformers/CreateCompanyTransformer';
import { CreateCompanyService } from '@modules/company/services/CreateCompanyService';

@singleton()
export class CreateCompanyController {
  constructor(
    private readonly transformer: CreateCompanyTransformer,
    private readonly service: CreateCompanyService
  ) {}

  handler = async (request: FastifyRequest<{ Body: CreateCompanyBodyRequest }>, reply: FastifyReply): Promise<CreateCompanyResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(201);
    return this.transformer.toApi(outputDTO);
  }  
}
