import { sendWhatsAppMessage } from '@config/baileys';
import { singleton } from 'tsyringe';
import { WhatsAppMessengerOutputDTO } from '../dto/WhatsAppMessengerOutputDto';
import { WhatsAppMessengerInputDTO } from '../dto/WhatsAppMessengerInputDto';

@singleton()
export class WhatsAppMessengerService {
  public async execute(inputDTO: WhatsAppMessengerInputDTO): Promise<WhatsAppMessengerOutputDTO> {
    await sendWhatsAppMessage({
      number: inputDTO.number,
      message: inputDTO.message,
    });

    return { success: true } as unknown as WhatsAppMessengerOutputDTO;
  }
}
