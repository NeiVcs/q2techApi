import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindByIdAdditionalParamsRequest, FindByIdAdditionalResponse } from '@modules/additional/schemas/FindByIdAdditionalSchema'
import { FindByIdAdditionalTransformer } from '@modules/additional/transformers/FindByIdAdditionalTransformer';
import { FindByIdAdditionalService } from '@modules/additional/services/FindByIdAdditionalService';

@singleton()
export class FindByIdAdditionalController {
  constructor(
    private readonly transformer: FindByIdAdditionalTransformer,
    private readonly service: FindByIdAdditionalService
  ) { }

  handler = async (request: FastifyRequest<{ Params: FindByIdAdditionalParamsRequest }>, reply: FastifyReply): Promise<FindByIdAdditionalResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }
}
