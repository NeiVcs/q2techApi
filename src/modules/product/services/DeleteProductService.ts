import { singleton } from 'tsyringe';
import { DeleteProductInputDTO } from "@modules/product/dto/DeleteProductInputDTO";
import { ProductRepository } from "@modules/product/data/ProductRepository";

@singleton()
export class DeleteProductService {
  constructor(private storage: ProductRepository) { }

  public async execute(inputDTO: DeleteProductInputDTO): Promise<void> {
    await this.storage.delete(inputDTO.id);
    return;
  }
}
