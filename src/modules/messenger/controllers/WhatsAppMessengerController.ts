import { FastifyRequest, FastifyReply } from 'fastify';
import { WhatsAppMessengerTransformer } from '../transformers/WhatsAppMessengerTransformer';
import { WhatsAppMessengerRequest, WhatsAppMessengerResponse } from '../schemas/WhatsAppMessengerSchema';
import { WhatsAppMessengerService } from '../services/WhatsAppMessengerService';
import { singleton } from 'tsyringe';

@singleton()
export class WhatsAppMessengerController {
  constructor(
    private readonly transformer: WhatsAppMessengerTransformer,
    private readonly service: WhatsAppMessengerService
  ) { }

  handler = async (
    request: FastifyRequest<{ Body: WhatsAppMessengerRequest }>,
    reply: FastifyReply
  ): Promise<WhatsAppMessengerResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);

    reply.code(200);
    return this.transformer.toApi(outputDTO);
  };
}
