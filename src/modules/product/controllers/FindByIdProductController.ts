import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindByIdProductParamsRequest, FindByIdProductResponse } from '@modules/product/schemas/FindByIdProductSchema'
import { FindByIdProductTransformer } from '@modules/product/transformers/FindByIdProductTransformer';
import { FindByIdProductService } from '@modules/product/services/FindByIdProductService';

@singleton()
export class FindByIdProductController {
  constructor(
    private readonly transformer: FindByIdProductTransformer,
    private readonly service: FindByIdProductService
  ) { }

  handler = async (request: FastifyRequest<{ Params: FindByIdProductParamsRequest }>, reply: FastifyReply): Promise<FindByIdProductResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }

}