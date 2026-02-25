import { singleton } from 'tsyringe';
import { FindAllProductInputDTO } from "@modules/product/dto/FindAllProductInputDTO";
import { FindAllProductOutputDTO } from "@modules/product/dto/FindAllProductOutputDTO";
import { ProductRepository } from '../data/ProductRepository';
import { AdditionalRepository } from '@modules/additional/data/AdditionalRepository';
import { IProduct } from '../data/IProduct';
import { IAdditional } from '@modules/additional/data/IAdditional';

@singleton()
export class FindAllProductService {
  constructor(
    private productStorage: ProductRepository,
    private additionalStorage: AdditionalRepository,
  ) { }

  public async execute(inputDTO: FindAllProductInputDTO): Promise<any> {
    const products = await this.productStorage.findAll(inputDTO);
    const additionalList = await this.findCategories(products);
    const populatedProducts = await this.populateCategory(products, additionalList)

    return { items: populatedProducts } as unknown as FindAllProductOutputDTO;
  }

  private async findCategories(productIdList: IProduct[]) {
    const allIds = productIdList.map(p => p.additionalIdList).flat().filter(Boolean);
    const uniqueIds = [...new Set(allIds)];
    const promises = uniqueIds.map(id => this.additionalStorage.findById(id!));
    const results = await Promise.all(promises);

    return results.filter(item => item !== null);
  }

  private async populateCategory(products: IProduct[], additionalList: IAdditional[]) {
    return products.map(product => {
      const items = { id: product.id, ...product.toObject() }

      const groups = additionalList.filter(add =>
        items.additionalIdList?.includes(add.id)
      ).map(g => ({
        ...(g.toObject()),
        id: g._id.toString()
      }));

      return { ...items, additionalList: groups };
    });
  }
}
