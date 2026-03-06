import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindByIdUserParamsRequest, FindByIdUserResponse } from '@modules/user/schemas/FindByIdUserSchema'
import { FindByIdUserTransformer } from '@modules/user/transformers/FindByIdUserTransformer';
import { FindByIdUserService } from '@modules/user/services/FindByIdUserService';

@singleton()
export class FindByIdUserController {
  constructor(
    private readonly transformer: FindByIdUserTransformer,
    private readonly service: FindByIdUserService
  ) {}

  handler = async (request: FastifyRequest<{ Params: FindByIdUserParamsRequest }>, reply: FastifyReply): Promise<FindByIdUserResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
