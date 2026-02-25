import { singleton } from 'tsyringe';
import { CreateProductInputDTO } from "@modules/product/dto/CreateProductInputDTO";
import { CreateProductOutputDTO } from "@modules/product/dto/CreateProductOutputDTO";
import { ProductRepository } from '../data/ProductRepository';

@singleton()
export class CreateProductService {
  constructor(private storage: ProductRepository) { }

  public async execute(inputDTO: CreateProductInputDTO): Promise<CreateProductOutputDTO> {
    const response = await this.storage.save({ ...inputDTO });
    return response as unknown as CreateProductOutputDTO;
  }
}
