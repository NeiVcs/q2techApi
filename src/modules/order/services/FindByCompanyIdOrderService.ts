import { singleton } from 'tsyringe';
import { FindByCompanyIdOrderInputDTO } from "@modules/order/dto/FindByCompanyIdOrderInputDTO";
import { OrderRepository } from "@modules/order/data/OrderRepository";
import { FindByCompanyIdOrderOutputDTO } from "@modules/order/dto/FindByCompanyIdOrderOutputDTO";

@singleton()
export class FindByCompanyIdOrderService {
  constructor(private storage: OrderRepository) { }

  public async execute(inputDTO: FindByCompanyIdOrderInputDTO): Promise<FindByCompanyIdOrderOutputDTO> {
    const response = await this.storage.findByCompanyId(inputDTO);
    return response as unknown as FindByCompanyIdOrderOutputDTO;
  }
}
