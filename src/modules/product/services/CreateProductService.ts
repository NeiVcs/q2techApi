import { singleton } from 'tsyringe';
import { CreateProductInputDTO } from "@modules/product/dto/CreateProductInputDTO";
import { ProductRepository } from "@modules/product/data/ProductRepository";
import { CreateProductOutputDTO } from "@modules/product/dto/CreateProductOutputDTO";

@singleton()
export class CreateProductService {
  constructor(private storage: ProductRepository) { }

  public async execute(inputDTO: CreateProductInputDTO): Promise<CreateProductOutputDTO> {
    const response = await this.storage.save(inputDTO);
    return response as unknown as CreateProductOutputDTO;
  }
}
