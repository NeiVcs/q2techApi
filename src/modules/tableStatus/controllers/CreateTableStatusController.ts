import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { CreateTableStatusBodyRequest, CreateTableStatusResponse } from '@modules/tableStatus/schemas/CreateTableStatusSchema'
import { CreateTableStatusTransformer } from '@modules/tableStatus/transformers/CreateTableStatusTransformer';
import { CreateTableStatusService } from '@modules/tableStatus/services/CreateTableStatusService';

@singleton()
export class CreateTableStatusController {
  constructor(
    private readonly transformer: CreateTableStatusTransformer,
    private readonly service: CreateTableStatusService
  ) {}

  handler = async (request: FastifyRequest<{ Body: CreateTableStatusBodyRequest }>, reply: FastifyReply): Promise<CreateTableStatusResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(201);
    return this.transformer.toApi(outputDTO);
  }  
}
