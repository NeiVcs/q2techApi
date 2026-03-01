import { singleton } from 'tsyringe';
import { CreateOrderInputDTO } from "@modules/order/dto/CreateOrderInputDTO";
import { OrderRepository } from "@modules/order/data/OrderRepository";
import { CreateOrderOutputDTO } from "@modules/order/dto/CreateOrderOutputDTO";

@singleton()
export class CreateOrderService {
  constructor(private storage: OrderRepository) { }

  public async execute(inputDTO: CreateOrderInputDTO): Promise<CreateOrderOutputDTO> {
    const response = await this.storage.save(inputDTO);
    return response as unknown as CreateOrderOutputDTO;
  }
}
