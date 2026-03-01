import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateProductBodyRequest, UpdateProductParamsRequest } from '@modules/product/schemas/UpdateProductSchema'
import { UpdateProductTransformer } from '@modules/product/transformers/UpdateProductTransformer';
import { UpdateProductService } from '@modules/product/services/UpdateProductService';

@singleton()
export class UpdateProductController {
  constructor(
    private readonly transformer: UpdateProductTransformer,
    private readonly service: UpdateProductService
  ) { }

  handler = async (request: FastifyRequest<{ Body: UpdateProductBodyRequest; Params: UpdateProductParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);

    await this.service.execute(inputDTO);
    reply.code(204);
  }
}
