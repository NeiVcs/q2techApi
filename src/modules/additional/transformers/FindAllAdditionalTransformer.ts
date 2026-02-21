import { singleton } from 'tsyringe';
import { FindAllAdditionalResponse } from '@modules/additional/schemas/FindAllAdditionalSchema'
import { FindAllAdditionalOutputDTO } from "@modules/additional/dto/FindAllAdditionalOutputDTO";

@singleton()
export class FindAllAdditionalTransformer {
  public toApi(outputDTO: FindAllAdditionalOutputDTO): FindAllAdditionalResponse {
    return {
      items: Array.isArray(outputDTO?.items) ? outputDTO.items.map(f => ({
        id: f?.id ?? '',
        name: f?.name ?? '',
        min: f?.min ?? '',
        max: f?.max ?? '',
        productIdList: f?.productIdList ?? [],
      })) : [],
    };
  }
}
