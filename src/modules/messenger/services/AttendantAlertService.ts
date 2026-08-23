import { singleton } from 'tsyringe';
import { AttendantAlertInputDTO } from '../dto/AttendantAlertInputDTO';
import { AttendantAlertOutputDTO } from '../dto/AttendantAlertOutputDTO';
import { sendWhatsAppMessage } from '@config/baileys';

@singleton()
export class AttendantAlertService {
  constructor() { }

  public async execute(inputDTO: AttendantAlertInputDTO): Promise<AttendantAlertOutputDTO> {
    const companyWhatsAppNumber = '5519997259533'

    await sendWhatsAppMessage({
      number: companyWhatsAppNumber,
      message: `⚠️ ${inputDTO.table} solicitando atendimento! ⚠️`,
    });

    const response = { message: 'ok' }

    return response as unknown as AttendantAlertOutputDTO;
  }
}
