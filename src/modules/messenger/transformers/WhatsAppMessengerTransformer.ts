import { FastifyRequest } from 'fastify';
import { singleton } from 'tsyringe';
import { WhatsAppMessengerOutputDTO } from '../dto/WhatsAppMessengerOutputDto';
import { WhatsAppMessengerRequest, WhatsAppMessengerResponse } from '../schemas/WhatsAppMessengerSchema';
import { WhatsAppMessengerInputDTO } from '../dto/WhatsAppMessengerInputDto';

@singleton()
export class WhatsAppMessengerTransformer {
  fromApi(request: FastifyRequest<{ Body: WhatsAppMessengerRequest }>): WhatsAppMessengerInputDTO {
    const { number, message } = request.body;

    return {
      number,
      message,
    };
  }

  toApi(outputDTO: WhatsAppMessengerOutputDTO): WhatsAppMessengerResponse {
    return {
      success: outputDTO.success,
    };
  }
}
