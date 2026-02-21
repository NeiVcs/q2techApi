import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateAdditionalBodyRequest, CreateAdditionalResponse } from '@modules/additional/schemas/CreateAdditionalSchema'
import { CreateAdditionalTransformer } from '@modules/additional/transformers/CreateAdditionalTransformer';
import { CreateAdditionalService } from '@modules/additional/services/CreateAdditionalService';

@singleton()
export class CreateAdditionalController {
  constructor(private readonly transformer: CreateAdditionalTransformer,
              private readonly service: CreateAdditionalService) {}

  handler = async (request: FastifyRequest<{ Body: CreateAdditionalBodyRequest }>, reply: FastifyReply): Promise<CreateAdditionalResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(201);
    return this.transformer.toApi(outputDTO);
  }
  
}