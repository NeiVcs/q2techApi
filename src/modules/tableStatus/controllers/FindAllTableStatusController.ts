import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { FindAllTableStatusResponse } from '@modules/tableStatus/schemas/FindAllTableStatusSchema'
import { FindAllTableStatusTransformer } from '@modules/tableStatus/transformers/FindAllTableStatusTransformer';
import { FindAllTableStatusService } from '@modules/tableStatus/services/FindAllTableStatusService';

@singleton()
export class FindAllTableStatusController {
  constructor(
    private readonly transformer: FindAllTableStatusTransformer,
    private readonly service: FindAllTableStatusService
  ) {}

  handler = async (_: FastifyRequest, reply: FastifyReply): Promise<FindAllTableStatusResponse> => {
    const inputDTO = this.transformer.fromApi();
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }  
}
