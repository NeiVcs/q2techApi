import { singleton } from 'tsyringe';
import { CreateOrderInputDTO } from "@modules/order/dto/CreateOrderInputDTO";
import { OrderRepository } from "@modules/order/data/OrderRepository";
import { CreateOrderOutputDTO } from "@modules/order/dto/CreateOrderOutputDTO";
import { generateUuidV4 } from '@shared/uuid';

@singleton()
export class CreateOrderService {
  constructor(private storage: OrderRepository) { }

  public async execute(inputDTO: CreateOrderInputDTO): Promise<CreateOrderOutputDTO> {
    inputDTO.createdAt = new Date().toISOString();

    if (!inputDTO?.userData?.userId) {
      await this.getUserId(inputDTO);
    }

    const response = await this.storage.save(inputDTO);
    return response as unknown as CreateOrderOutputDTO;
  }

  private async getUserId(inputDTO: CreateOrderInputDTO): Promise<void> {
    const ordersList = await this.storage.findByCompanyId({ companyId: inputDTO.companyId, userPhoneNumber: inputDTO.userData.phoneNumber });

    if (ordersList?.items?.length > 0 && ordersList?.items[ordersList?.items?.length - 1]?.userData?.userId) {
      inputDTO.userData.userId = ordersList.items[ordersList?.items?.length - 1].userData.userId;
      return
    }
    inputDTO.userData.userId = generateUuidV4();
  }
}
