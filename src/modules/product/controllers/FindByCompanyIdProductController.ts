import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindByCompanyIdProductParamsRequest, FindByCompanyIdProductQueryRequest, FindByCompanyIdProductResponse } from '@modules/product/schemas/FindByCompanyIdProductSchema'
import { FindByCompanyIdProductTransformer } from '../transformers/FindByCompanyIdProductTransformer';
import { FindByCompanyIdProductService } from '../services/FindByCompanyIdProductService';

@singleton()
export class FindByCompanyIdProductController {
  constructor(private readonly transformer: FindByCompanyIdProductTransformer,
    private readonly service: FindByCompanyIdProductService) { }

  handler = async (request: FastifyRequest<{ Params: FindByCompanyIdProductParamsRequest; Querystring: FindByCompanyIdProductQueryRequest }>, reply: FastifyReply): Promise<FindByCompanyIdProductResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }
}
