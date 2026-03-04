import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindAllUserQueryRequest, FindAllUserResponse } from '@modules/user/schemas/FindAllUserSchema'
import { FindAllUserTransformer } from '@modules/user/transformers/FindAllUserTransformer';
import { FindAllUserService } from '@modules/user/services/FindAllUserService';

@singleton()
export class FindAllUserController {
  constructor(
    private readonly transformer: FindAllUserTransformer,
    private readonly service: FindAllUserService
  ) {}

  handler = async (request: FastifyRequest<{ Querystring: FindAllUserQueryRequest }>, reply: FastifyReply): Promise<FindAllUserResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
