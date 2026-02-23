import { singleton } from 'tsyringe';
import { FindAllProductInputDTO } from "@modules/product/dto/FindAllProductInputDTO";
import { FindAllProductOutputDTO } from "@modules/product/dto/FindAllProductOutputDTO";
import { ProductRepository } from '../data/ProductRepository';
import { IProduct } from '../data/IProduct';
import { AdditionalRepository } from '@modules/additional/data/AdditionalRepository';
import { FindAllProductTransformer } from '@modules/product/transformers/FindAllProductTransformer';

@singleton()
export class FindAllProductService {
  constructor(
    private productStorage: ProductRepository,
    private additionalStorage: AdditionalRepository,
    private transformer: FindAllProductTransformer
  ) { }

  public async execute(inputDTO: FindAllProductInputDTO): Promise<FindAllProductOutputDTO> {
    const entity = await this.productStorage.findAll()
    const outputDto = this.findCategories(entity)

    return { items: entity } as unknown as FindAllProductOutputDTO;
  }

  private async findCategories(entity: IProduct[]) {
    // const outputDto: FindAllProductOutputDTO = this.transformer.toApi({items: entity})
    //
    // const promises = entity.map(async (el) => {
    //   if (el.additionalListId) {
    //     const results = await this.additionalStorage.findById(el.additionalListId);
    //
    //     const product = outputDto.items.find(f => f.id === el.id);
    //     product.additionalList = results;
    //     console.log(product);
    //   }
    //   return null;
    // });
    //
    // const results = await Promise.all(promises);

    //const additionalListGroup = results.filter(item => item !== null);
    //return { items: additionalListGroup } as unknown as FindAllProductOutputDTO;
  }
}
