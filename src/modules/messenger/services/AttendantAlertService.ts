import { singleton } from 'tsyringe';
import { AttendantAlertInputDTO } from '../dto/AttendantAlertInputDTO';
import { AttendantAlertOutputDTO } from '../dto/AttendantAlertOutputDTO';
import { sendWhatsAppMessage } from '@config/baileys';
import { CompanyRepository } from '@modules/company/data/CompanyRepository';

@singleton()
export class AttendantAlertService {
  constructor(private storage: CompanyRepository) { }

  public async execute(inputDTO: AttendantAlertInputDTO): Promise<AttendantAlertOutputDTO> {
    const whatsappNumberList = await this.validateCompany(inputDTO)

    const sendMessage = (number: string) =>
      sendWhatsAppMessage({
        number: `55${number}`,
        message: `⚠️ Mesa ${inputDTO.table} solicitando atendimento! ⚠️`,
      });


    await Promise.all(whatsappNumberList.map((number: string) => sendMessage(number)));

    const response = { message: 'Um atendente está indo até sua mesa' }

    return response as unknown as AttendantAlertOutputDTO;
  }

  private async validateCompany(inputDTO: AttendantAlertInputDTO): Promise<string[]> {
    const companyData = await this.storage.findById(inputDTO.companyId);

    if (!companyData || !companyData.contacts?.whatsappNumberList) {
      throw new Error('Empresa ou lista de contatos do WhatsApp não encontrada.');
    }

    // TODO: validar se a mesa existe
    // companyData.tableList.includes((el) => inputDTO.table)

    // verificar se já existe chamada desta mesma mesa
    // persistir em banco a chamada

    return companyData.contacts.whatsappNumberList;
  }
}
