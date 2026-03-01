import { singleton } from 'tsyringe';
import { FindByIdOrderInputDTO } from "@modules/order/dto/FindByIdOrderInputDTO";
import { OrderRepository } from "@modules/order/data/OrderRepository";
import { FindByIdOrderOutputDTO } from "@modules/order/dto/FindByIdOrderOutputDTO";

@singleton()
export class FindByIdOrderService {
  constructor( private storage: OrderRepository ) { }
  
  public async execute(inputDTO: FindByIdOrderInputDTO): Promise<FindByIdOrderOutputDTO> {
    const response = await this.storage.findById(inputDTO.id);
    return response as unknown as FindByIdOrderOutputDTO;
  }
}
  