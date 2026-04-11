import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateUserPasswordBodyRequest } from '@modules/user/schemas/UpdateUserPasswordSchema'
import { UpdateUserPasswordTransformer } from '@modules/user/transformers/UpdateUserPasswordTransformer';
import { UpdateUserPasswordService } from '@modules/user/services/UpdateUserPasswordService';

@singleton()
export class UpdateUserPasswordController {
  constructor(
    private readonly transformer: UpdateUserPasswordTransformer,
    private readonly service: UpdateUserPasswordService
  ) {}

  handler = async (request: FastifyRequest<{ Body: UpdateUserPasswordBodyRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);
    
    await this.service.execute(inputDTO);
    reply.code(204);
  }  
}
