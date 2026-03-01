import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { UpdateAdditionalBodyRequest, UpdateAdditionalParamsRequest } from '@modules/additional/schemas/UpdateAdditionalSchema'
import { UpdateAdditionalTransformer } from '@modules/additional/transformers/UpdateAdditionalTransformer';
import { UpdateAdditionalService } from '@modules/additional/services/UpdateAdditionalService';

@singleton()
export class UpdateAdditionalController {
  constructor(
    private readonly transformer: UpdateAdditionalTransformer,
    private readonly service: UpdateAdditionalService
  ) { }

  handler = async (request: FastifyRequest<{ Body: UpdateAdditionalBodyRequest; Params: UpdateAdditionalParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);

    await this.service.execute(inputDTO);
    reply.code(204);
  }
}
