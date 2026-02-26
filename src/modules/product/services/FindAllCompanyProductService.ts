import { singleton } from 'tsyringe';
import { ProductRepository } from '../data/ProductRepository';
import { AdditionalRepository } from '@modules/additional/data/AdditionalRepository';
import { FindAllProductInputDTO } from '../dto/FindAllProductInputDTO';
import { FindAllProductOutputDTO } from '../dto/FindAllProductOutputDTO';
import { IAdditional } from '@modules/additional/data/IAdditional';
import { FindByIdAdditionalOutputDTO } from '@modules/additional/dto/FindByIdAdditionalOutputDTO';

@singleton()
export class FindAllCompanyProductService {
  constructor(
    private productStorage: ProductRepository,
    private additionalStorage: AdditionalRepository,
  ) { }

  public async execute(inputDTO: FindAllProductInputDTO): Promise<any> {
    const products = await this.productStorage.findByCompanyId(inputDTO);
    const additionalList = await this.findCategories(products);
    const populatedProducts = await this.populateCategory(products, additionalList)

    return { items: populatedProducts, pagination: products.pagination } as unknown as FindAllProductOutputDTO;
  }

  private async findCategories(productIdList: FindAllProductOutputDTO) {
    const allIds = productIdList.items.map(p => p.additionalIdList).flat().filter(Boolean);
    const uniqueIds = [...new Set(allIds)];
    const promises = uniqueIds.map(id => this.additionalStorage.findById(id!));
    const results = await Promise.all(promises);

    return results.filter(item => item !== null);
  }

  private async populateCategory(products: FindAllProductOutputDTO, additionalList: FindByIdAdditionalOutputDTO[]) {
    return products.items.map(product => {
      const items = { id: product.id, ...product }

      const groups = additionalList.filter(add =>
        items.additionalIdList?.includes(add.id)
      )

      return { ...items, additionalList: groups };
    });
  }
}
