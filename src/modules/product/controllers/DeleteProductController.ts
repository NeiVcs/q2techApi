import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteProductParamsRequest } from '@modules/product/schemas/DeleteProductSchema'
import { DeleteProductTransformer } from '@modules/product/transformers/DeleteProductTransformer';
import { DeleteProductService } from '@modules/product/services/DeleteProductService';

@singleton()
export class DeleteProductController {
  constructor(
    private readonly transformer: DeleteProductTransformer,
    private readonly service: DeleteProductService
  ) { }

  handler = async (request: FastifyRequest<{ Params: DeleteProductParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);

    await this.service.execute(inputDTO);
    reply.code(204);
  }
}
