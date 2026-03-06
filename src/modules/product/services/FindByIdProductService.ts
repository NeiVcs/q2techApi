import { singleton } from 'tsyringe';
import { FindByIdProductInputDTO } from "@modules/product/dto/FindByIdProductInputDTO";
import { ProductRepository } from "@modules/product/data/ProductRepository";
import { FindByIdProductOutputDTO } from "@modules/product/dto/FindByIdProductOutputDTO";

@singleton()
export class FindByIdProductService {
  constructor( private storage: ProductRepository ) { }
  
  public async execute(inputDTO: FindByIdProductInputDTO): Promise<FindByIdProductOutputDTO> {
    const response = await this.storage.findById(inputDTO.id);
    return response as unknown as FindByIdProductOutputDTO;
  }
}
  