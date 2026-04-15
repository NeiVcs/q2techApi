import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindByIdAdditionalParamsRequest, FindByIdAdditionalResponse } from '@modules/additional/schemas/FindByIdAdditionalSchema'
import { FindByIdAdditionalInputDTO } from "@modules/additional/dto/FindByIdAdditionalInputDTO";
import { FindByIdAdditionalOutputDTO } from "@modules/additional/dto/FindByIdAdditionalOutputDTO";

@singleton()
export class FindByIdAdditionalTransformer {
  public fromApi(request?: FastifyRequest<{ Params: FindByIdAdditionalParamsRequest }>): FindByIdAdditionalInputDTO {
    const { params } = request;

    return {
      id: params.id,
    };
  }

  public toApi(outputDTO: FindByIdAdditionalOutputDTO): FindByIdAdditionalResponse {
    return {
      id: outputDTO?.id ?? '',
      companyId: outputDTO?.companyId ?? '',
      category: outputDTO?.category ?? '',
      name: outputDTO?.name ?? '',
      min: outputDTO?.min ?? 0,
      max: outputDTO?.max ?? 0,
      productList: Array.isArray(outputDTO?.productList)
        ? outputDTO.productList.map(product => ({
          productId: product.id || (product as any).productId || '',
          price: product.price ?? 0
        }))
        : [],
    };
  }
}
