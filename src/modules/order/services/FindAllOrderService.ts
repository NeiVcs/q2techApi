import { singleton } from 'tsyringe';
import { FindAllOrderInputDTO } from "@modules/order/dto/FindAllOrderInputDTO";
import { OrderRepository } from "@modules/order/data/OrderRepository";
import { FindAllOrderOutputDTO } from "@modules/order/dto/FindAllOrderOutputDTO";

@singleton()
export class FindAllOrderService {
  constructor( private storage: OrderRepository ) { }
  
  public async execute(inputDTO: FindAllOrderInputDTO): Promise<FindAllOrderOutputDTO> {
    const response = await this.storage.findAll(inputDTO);
    return response as unknown as FindAllOrderOutputDTO;
  }
}
  