import { singleton } from 'tsyringe';
import { UpdateProductInputDTO } from "@modules/product/dto/UpdateProductInputDTO";
import { ProductRepository } from '../data/ProductRepository';

@singleton()
export class UpdateProductService {
  constructor(private storage: ProductRepository) { }

  public async execute(inputDTO: UpdateProductInputDTO): Promise<void> {
    await this.storage.update(inputDTO);
    return;
  }
}
