import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindAllImagesQueryRequest, FindAllImagesResponse } from '@modules/cloudinary/schemas/FindAllImagesSchema'
import { FindAllImagesTransformer } from '@modules/cloudinary/transformers/FindAllImagesTransformer';
import { FindAllImagesService } from '@modules/cloudinary/services/FindAllImagesService';

@singleton()
export class FindAllImagesController {
  constructor(
    private readonly transformer: FindAllImagesTransformer,
    private readonly service: FindAllImagesService
  ) {}

  handler = async (request: FastifyRequest<{ Querystring: FindAllImagesQueryRequest }>, reply: FastifyReply): Promise<FindAllImagesResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
