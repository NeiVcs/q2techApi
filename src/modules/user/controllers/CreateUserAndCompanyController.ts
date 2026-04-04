import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserAndCompanyBodyRequest, CreateUserAndCompanyResponse } from '@modules/user/schemas/CreateUserAndCompanySchema'
import { CreateUserAndCompanyTransformer } from '@modules/user/transformers/CreateUserAndCompanyTransformer';
import { CreateUserAndCompanyService } from '@modules/user/services/CreateUserAndCompanyService';

@singleton()
export class CreateUserAndCompanyController {
  constructor(
    private readonly transformer: CreateUserAndCompanyTransformer,
    private readonly service: CreateUserAndCompanyService
  ) {}

  handler = async (request: FastifyRequest<{ Body: CreateUserAndCompanyBodyRequest }>, reply: FastifyReply): Promise<CreateUserAndCompanyResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(201);
    return this.transformer.toApi(outputDTO);
  }  
}
