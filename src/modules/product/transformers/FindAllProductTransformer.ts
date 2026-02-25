import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindAllProductResponse } from '@modules/product/schemas/FindAllProductSchema'
import { FindAllProductInputDTO } from "@modules/product/dto/FindAllProductInputDTO";
import { FindAllProductOutputDTO } from "@modules/product/dto/FindAllProductOutputDTO";

@singleton()
export class FindAllProductTransformer {
  public fromApi(request?: FastifyRequest): FindAllProductInputDTO {
    return {};
  }

  public toApi(outputDTO: FindAllProductOutputDTO): FindAllProductResponse {
    console.log(outputDTO.items[13])
    return {
      items: Array.isArray(outputDTO?.items) ? outputDTO.items.map(f => ({
        id: f?.id ?? '',
        storeId: f?.storeId ?? '',
        name: f?.name ?? '',
        category: f?.category ?? '',
        description: f?.description ?? '',
        isActived: f?.isActived ?? '',
        imgUrl: f?.imgUrl ?? '',
        price: f?.price ?? 0,
        previewPrice: f?.previewPrice ?? 0,
        additionalList: f?.additionalList.length > 0 ? f?.additionalList : null,
      })) : [],
    };
  }
}
