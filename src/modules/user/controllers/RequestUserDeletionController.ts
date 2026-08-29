import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { RequestUserDeletionBodyRequest } from '@modules/user/schemas/RequestUserDeletionSchema'
import { RequestUserDeletionTransformer } from '@modules/user/transformers/RequestUserDeletionTransformer';
import { RequestUserDeletionService } from '@modules/user/services/RequestUserDeletionService';

@singleton()
export class RequestUserDeletionController {
  constructor(
    private readonly transformer: RequestUserDeletionTransformer,
    private readonly service: RequestUserDeletionService
  ) { }

  handler = async (request: FastifyRequest<{ Body: RequestUserDeletionBodyRequest }>, reply: FastifyReply): Promise<void> => {
    const inputDTO = this.transformer.fromApi(request);

    await this.service.execute(inputDTO);
    reply.code(204);
  }
}
