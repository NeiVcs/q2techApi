import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserBodyRequest, UpdateUserParamsRequest } from '@modules/user/schemas/UpdateUserSchema'
import { UpdateUserTransformer } from '@modules/user/transformers/UpdateUserTransformer';
import { UpdateUserService } from '@modules/user/services/UpdateUserService';

@singleton()
export class UpdateUserController {
  constructor(
    private readonly transformer: UpdateUserTransformer,
    private readonly service: UpdateUserService
  ) {}

  handler = async (request: FastifyRequest<{ Body: UpdateUserBodyRequest; Params: UpdateUserParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);
    
    await this.service.execute(inputDTO);
    reply.code(204);
  }  
}
