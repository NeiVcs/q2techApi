import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { DeleteTableStatusParamsRequest } from '@modules/tableStatus/schemas/DeleteTableStatusSchema'
import { DeleteTableStatusTransformer } from '@modules/tableStatus/transformers/DeleteTableStatusTransformer';
import { DeleteTableStatusService } from '@modules/tableStatus/services/DeleteTableStatusService';

@singleton()
export class DeleteTableStatusController {
  constructor(
    private readonly transformer: DeleteTableStatusTransformer,
    private readonly service: DeleteTableStatusService
  ) {}

  handler = async (request: FastifyRequest<{ Params: DeleteTableStatusParamsRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);
    
    await this.service.execute(inputDTO);
    reply.code(204);
  }  
}
