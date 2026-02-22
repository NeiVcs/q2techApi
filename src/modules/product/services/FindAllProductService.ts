import { singleton } from 'tsyringe';
import { FindAllProductInputDTO } from "@modules/product/dto/FindAllProductInputDTO";
import { FindAllProductOutputDTO } from "@modules/product/dto/FindAllProductOutputDTO";
import { ProductRepository } from '../data/ProductRepository';
import { IProduct } from '../data/IProduct';

@singleton()
export class FindAllProductService {
  constructor(private storage: ProductRepository) { }

  public async execute(inputDTO: FindAllProductInputDTO): Promise<FindAllProductOutputDTO> {
    const response = await this.storage.findAll();
    this.findCategories(response)

    return { items: response } as unknown as FindAllProductOutputDTO;
  }

  private async findCategories(productList: IProduct[]) {
    const promises = productList.map(async (el) => {
      if (el.additionalListId) {
        return await this.storage.findById(el.additionalListId);
      }
      return null;
    });

    //const results = await Promise.all(promises);
    //const additionalListGroup = results.filter(item => item !== null);
    //return { items: additionalListGroup } as unknown as FindAllProductOutputDTO;
  }
}
