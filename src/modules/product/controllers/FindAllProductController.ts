import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindAllProductResponse } from '@modules/product/schemas/FindAllProductSchema'
import { FindAllProductTransformer } from '@modules/product/transformers/FindAllProductTransformer';
import { FindAllProductService } from '@modules/product/services/FindAllProductService';

@singleton()
export class FindAllProductController {
  constructor(
    private readonly transformer: FindAllProductTransformer,
    private readonly service: FindAllProductService
  ) { }

  handler = async (_: FastifyRequest, reply: FastifyReply): Promise<FindAllProductResponse> => {
    const inputDTO = this.transformer.fromApi();
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }
}
