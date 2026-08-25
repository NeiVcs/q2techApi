import { singleton } from 'tsyringe';
import { CreateOrderInputDTO } from "@modules/order/dto/CreateOrderInputDTO";
import { OrderRepository } from "@modules/order/data/OrderRepository";
import { CreateOrderOutputDTO } from "@modules/order/dto/CreateOrderOutputDTO";
import { generateUuidV4 } from '@shared/uuid';
import { CompanyRepository } from '@modules/company/data/CompanyRepository';
import { sendWhatsAppMessage } from '@config/baileys';
import { FindByIdCompanyOutputDTO } from '@modules/company/dto/FindByIdCompanyOutputDTO';
import { formatCEP, formatCurrency, formatDateTime, formatDeliveryMode, formatPaymentMethod, formatPhone } from '@shared/helpers/masks';

@singleton()
export class CreateOrderService {
  constructor(
    private orderStorage: OrderRepository,
    private companyStorage: CompanyRepository
  ) { }

  public async execute(inputDTO: CreateOrderInputDTO): Promise<CreateOrderOutputDTO> {
    inputDTO.createdAt = new Date().toISOString();

    if (!inputDTO?.userData?.userId) {
      await this.getUserId(inputDTO);
    }

    const response = await this.orderStorage.save(inputDTO);
    this.sendMessage(inputDTO)

    return response as unknown as CreateOrderOutputDTO;
  }

  private async getUserId(inputDTO: CreateOrderInputDTO): Promise<void> {
    const ordersList = await this.orderStorage.findByCompanyId({ companyId: inputDTO.companyId, userPhoneNumber: inputDTO.userData.phoneNumber });

    if (ordersList?.items?.length > 0 && ordersList?.items[ordersList?.items?.length - 1]?.userData?.userId) {
      inputDTO.userData.userId = ordersList.items[ordersList?.items?.length - 1].userData.userId;
      return
    }
    inputDTO.userData.userId = generateUuidV4();
  }

  private async sendMessage(inputDto: CreateOrderInputDTO): Promise<void> {
    const companyData = await this.companyStorage.findById(inputDto.companyId);
    const message = await this.createMessage(inputDto, companyData)

    if (!companyData || !companyData.contacts?.whatsappNumberList) {
      throw new Error('Empresa ou lista de contatos do WhatsApp não encontrada.');
    }

    const sendMessage = (number: string) =>
      sendWhatsAppMessage({
        number: `55${number}`,
        message,
      });

    await Promise.all(companyData.contacts.whatsappNumberList.map((number: string) => sendMessage(number)));
  }

  private async createMessage(inputDto: CreateOrderInputDTO, companyData: FindByIdCompanyOutputDTO): Promise<string> {
    const buildOrderMessage = inputDto.orderData.map((product: any) =>
      `\n✅ ${product.quantity} - ${product.name}`
    )

    const message = `
🛍️ Nova compra na sua loja ${companyData.name}! 🛍️

data: ${formatDateTime(inputDto.createdAt)}
Valor total: ${formatCurrency(inputDto.totalPrice)}
Forma de pagamento: ${formatPaymentMethod(inputDto.paymentForm)}
Modo de entrega: ${formatDeliveryMode(inputDto.deliveryMode)}


🛒 Dados da compra 
${buildOrderMessage}


🥸 Dados do comprador

Nome: ${inputDto.userData.name}
Telefone: ${formatPhone(inputDto.userData.phoneNumber)}
Endereço: ${inputDto.userData.address.street} nº ${inputDto.userData.address.number} 
${inputDto.userData.address.neighborhood}, ${inputDto.userData.address.city} - ${inputDto.userData.address.state}
${inputDto.userData.address?.zipCode && 'CEP ' + formatCEP(inputDto.userData.address.zipCode)}}

Veja o pedido completo no site: https://escolhacertadigital.netlify.app/${companyData.url}/pedidos
    `
    return message
  }
}
