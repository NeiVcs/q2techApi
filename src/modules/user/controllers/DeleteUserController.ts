import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteUserParamsRequest } from '@modules/user/schemas/DeleteUserSchema'
import { DeleteUserTransformer } from '@modules/user/transformers/DeleteUserTransformer';
import { DeleteUserService } from '@modules/user/services/DeleteUserService';

@singleton()
export class DeleteUserController {
  constructor(
    private readonly transformer: DeleteUserTransformer,
    private readonly service: DeleteUserService
  ) {}

  handler = async (request: FastifyRequest<{ Params: DeleteUserParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);
    
    await this.service.execute(inputDTO);
    reply.code(204);
  }  
}
