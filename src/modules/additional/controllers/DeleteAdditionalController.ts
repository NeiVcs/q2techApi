import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteAdditionalParamsRequest } from '@modules/additional/schemas/DeleteAdditionalSchema'
import { DeleteAdditionalTransformer } from '@modules/additional/transformers/DeleteAdditionalTransformer';
import { DeleteAdditionalService } from '@modules/additional/services/DeleteAdditionalService';

@singleton()
export class DeleteAdditionalController {
  constructor(
    private readonly transformer: DeleteAdditionalTransformer,
    private readonly service: DeleteAdditionalService
  ) { }

  handler = async (request: FastifyRequest<{ Params: DeleteAdditionalParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);

    await this.service.execute(inputDTO);
    reply.code(204);
  }
}
