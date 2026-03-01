import { singleton } from 'tsyringe';
import { UpdateOrderInputDTO } from "@modules/order/dto/UpdateOrderInputDTO";
import { OrderRepository } from "@modules/order/data/OrderRepository";


@singleton()
export class UpdateOrderService {
  constructor( private storage: OrderRepository ) { }
  
  public async execute(inputDTO: UpdateOrderInputDTO): Promise<void> {
    await this.storage.update(inputDTO);
    return;
  }
}
  