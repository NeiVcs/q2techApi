import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindByIdProductParamsRequest, FindByIdProductResponse } from '@modules/product/schemas/FindByIdProductSchema'
import { FindByIdProductInputDTO } from "@modules/product/dto/FindByIdProductInputDTO";

@singleton()
export class FindByIdProductTransformer {
  public fromApi(request?: FastifyRequest<{ Params: FindByIdProductParamsRequest }>): FindByIdProductInputDTO {
    const { params } = request;

    return {
      id: params.id,
    };
  }

  public toApi(outputDTO: any): FindByIdProductResponse {
    return {
      id: outputDTO?.id ?? '',
      companyId: outputDTO?.companyId ?? '',
      name: outputDTO?.name ?? '',
      category: outputDTO?.category ?? '',
      description: outputDTO?.description ?? '',
      active: outputDTO?.active ?? false,
      isAdditional: outputDTO?.isAdditional ?? false,
      imgUrl: outputDTO?.imgUrl ?? '',
      price: outputDTO?.price ?? 0,
      previewPrice: outputDTO?.previewPrice ?? 0,
      additionalList: Array.isArray(outputDTO?.additionalList) ? outputDTO.additionalList.map(f => ({
        id: f?.id ?? '',
        category: f?.category ?? '',
        name: f?.name ?? '',
        min: f?.min ?? 0,
        max: f?.max ?? 0,
        productList: Array.isArray(f?.productList) ? f?.productList.map(g => ({
          id: g?.id ?? '',
          name: g?.name ?? '',
          category: g?.category ?? '',
          description: g?.description ?? '',
          imgUrl: g?.imgUrl ?? '',
          price: g?.price ?? 0,
          previewPrice: g?.previewPrice ?? 0,
        })) : []
      })) : [],
    };
  }
}
