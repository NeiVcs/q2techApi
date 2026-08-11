import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteImageParamsRequest } from '@modules/cloudinary/schemas/DeleteImageSchema'
import { DeleteImageTransformer } from '@modules/cloudinary/transformers/DeleteImageTransformer';
import { DeleteImageService } from '@modules/cloudinary/services/DeleteImageService';

@singleton()
export class DeleteImageController {
  constructor(
    private readonly transformer: DeleteImageTransformer,
    private readonly service: DeleteImageService
  ) {}

  handler = async (request: FastifyRequest<{ Params: DeleteImageParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);
    
    await this.service.execute(inputDTO);
    reply.code(204);
  }  
}
