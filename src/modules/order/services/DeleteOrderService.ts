import { singleton } from 'tsyringe';
import { DeleteOrderInputDTO } from "@modules/order/dto/DeleteOrderInputDTO";
import { OrderRepository } from "@modules/order/data/OrderRepository";


@singleton()
export class DeleteOrderService {
  constructor( private storage: OrderRepository ) { }
  
  public async execute(inputDTO: DeleteOrderInputDTO): Promise<void> {
    await this.storage.delete(inputDTO.id);
    return;
  }
}
  