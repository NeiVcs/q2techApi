import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateUserBodyRequest, CreateUserResponse } from '@modules/user/schemas/CreateUserSchema'
import { CreateUserTransformer } from '@modules/user/transformers/CreateUserTransformer';
import { CreateUserService } from '@modules/user/services/CreateUserService';

@singleton()
export class CreateUserController {
  constructor(
    private readonly transformer: CreateUserTransformer,
    private readonly service: CreateUserService
  ) {}

  handler = async (request: FastifyRequest<{ Body: CreateUserBodyRequest }>, reply: FastifyReply): Promise<CreateUserResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(201);
    return this.transformer.toApi(outputDTO);
  }  
}
