import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindAllCompanyProductParamsRequest, FindAllCompanyProductQueryRequest, FindAllCompanyProductResponse } from '@modules/product/schemas/FindAllCompanyProductSchema'
import { FindAllCompanyProductTransformer } from '@modules/product/transformers/FindAllCompanyProductTransformer';
import { FindAllCompanyProductService } from '@modules/product/services/FindAllCompanyProductService';

@singleton()
export class FindAllCompanyProductController {
  constructor(private readonly transformer: FindAllCompanyProductTransformer,
              private readonly service: FindAllCompanyProductService) {}

  handler = async (request: FastifyRequest<{ Params: FindAllCompanyProductParamsRequest; Querystring: FindAllCompanyProductQueryRequest }>, reply: FastifyReply): Promise<FindAllCompanyProductResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }
  
}