import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateProductBodyRequest, CreateProductResponse } from '@modules/product/schemas/CreateProductSchema'
import { CreateProductTransformer } from '@modules/product/transformers/CreateProductTransformer';
import { CreateProductService } from '@modules/product/services/CreateProductService';

@singleton()
export class CreateProductController {
  constructor(
    private readonly transformer: CreateProductTransformer,
    private readonly service: CreateProductService
  ) { }

  handler = async (request: FastifyRequest<{ Body: CreateProductBodyRequest }>, reply: FastifyReply): Promise<CreateProductResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(201);
    return this.transformer.toApi(outputDTO);
  }
}
