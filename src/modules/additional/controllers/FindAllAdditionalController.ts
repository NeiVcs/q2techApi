import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindAllAdditionalQueryRequest, FindAllAdditionalResponse } from '@modules/additional/schemas/FindAllAdditionalSchema'
import { FindAllAdditionalTransformer } from '@modules/additional/transformers/FindAllAdditionalTransformer';
import { FindAllAdditionalService } from '@modules/additional/services/FindAllAdditionalService';

@singleton()
export class FindAllAdditionalController {
  constructor(
    private readonly transformer: FindAllAdditionalTransformer,
    private readonly service: FindAllAdditionalService
  ) { }

  handler = async (request: FastifyRequest<{ Querystring: FindAllAdditionalQueryRequest }>, reply: FastifyReply): Promise<FindAllAdditionalResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);

    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }
}
