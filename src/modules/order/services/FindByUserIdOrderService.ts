import { singleton } from 'tsyringe';
import { FindByUserIdOrderInputDTO } from "@modules/order/dto/FindByUserIdOrderInputDTO";
import { OrderRepository } from "@modules/order/data/OrderRepository";
import { FindByUserIdOrderOutputDTO } from "@modules/order/dto/FindByUserIdOrderOutputDTO";

@singleton()
export class FindByUserIdOrderService {
  constructor( private storage: OrderRepository ) { }
  
  public async execute(inputDTO: FindByUserIdOrderInputDTO): Promise<FindByUserIdOrderOutputDTO> {
    const response = await this.storage.findByUserId(inputDTO);
    return response as unknown as FindByUserIdOrderOutputDTO;
  }
}
  