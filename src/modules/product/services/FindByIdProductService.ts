import { singleton } from 'tsyringe';
import { FindByIdProductInputDTO } from "@modules/product/dto/FindByIdProductInputDTO";
import { FindByIdProductOutputDTO } from "@modules/product/dto/FindByIdProductOutputDTO";
import { ProductRepository } from '../data/ProductRepository';
import { AdditionalRepository } from '@modules/additional/data/AdditionalRepository';
import { IAdditional } from '@modules/additional/data/IAdditional';

@singleton()
export class FindByIdProductService {
  constructor(
    private productStorage: ProductRepository,
    private additionalStorage: AdditionalRepository,
  ) { }

  public async execute(inputDTO: FindByIdProductInputDTO): Promise<any> {
    const product = await this.productStorage.findById(inputDTO.id);
    const additionalList = await this.findCategories(product);
    const populatedProducts = await this.populateCategory(product, additionalList)

    return populatedProducts as unknown as FindByIdProductOutputDTO;
  }

  private async findCategories(product: any) {
    const promises = product.additionalIdList.map(id => this.additionalStorage.findById(id!));
    const results = await Promise.all(promises);

    return results.filter(item => item !== null);
  }

  private async populateCategory(product: FindByIdProductOutputDTO, additionalList: IAdditional[]) {
    const uniqueIds = [...new Set(additionalList.map(el => el.productIdList).flat())];
    const promises = uniqueIds.map(item => this.productStorage.findById(item));
    const results = await Promise.all(promises);

    const additional = additionalList.map((el) => {
      return {
        ...el, productList: el.productIdList.map((ol) => results.find((il) => il.id === ol))
      }
    })

    return { ...product, additionalList: additional };
  }
}
