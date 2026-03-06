import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindAllAdditionalQueryRequest, FindAllAdditionalResponse } from '@modules/additional/schemas/FindAllAdditionalSchema'
import { FindAllAdditionalInputDTO } from "@modules/additional/dto/FindAllAdditionalInputDTO";
import { FindAllAdditionalOutputDTO } from "@modules/additional/dto/FindAllAdditionalOutputDTO";

@singleton()
export class FindAllAdditionalTransformer {
  public fromApi(request?: FastifyRequest<{ Querystring: FindAllAdditionalQueryRequest }>): FindAllAdditionalInputDTO {
    const { query } = request;

    return {
      page: query?.page || 0,
      pageSize: query?.pageSize || 0,
      companyId: query?.companyId || '',
    };
  }

  public toApi(outputDTO: FindAllAdditionalOutputDTO): FindAllAdditionalResponse {
    return {
      pagination: outputDTO?.pagination ? {
        page: outputDTO?.pagination?.page ?? 0,
        pageSize: outputDTO?.pagination?.pageSize ?? 0,
        total: outputDTO?.pagination?.total ?? 0,
      } : undefined,
      items: Array.isArray(outputDTO?.items) ? outputDTO.items.map(f => ({
        id: f?.id ?? '',
        companyId: f?.companyId ?? '',
        category: f?.category ?? '',
        name: f?.name ?? '',
        min: f?.min ?? 0,
        max: f?.max ?? 0,
        productIdList: f?.productIdList ?? [],
      })) : [],
    };
  }
}
