import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindAllCompanyProductParamsRequest, FindAllCompanyProductQueryRequest, FindAllCompanyProductResponse } from '@modules/product/schemas/FindAllCompanyProductSchema'
import { FindAllCompanyProductInputDTO } from "@modules/product/dto/FindAllCompanyProductInputDTO";
import { FindAllCompanyProductOutputDTO } from "@modules/product/dto/FindAllCompanyProductOutputDTO";
import { validateRequest } from '@shared/validateRequest';
import { paginationRequestSchema } from '@shared/validateRequest/validations/paginationRequestSchema';

@singleton()
export class FindAllCompanyProductTransformer {
  public fromApi(request?: FastifyRequest<{ Params: FindAllCompanyProductParamsRequest; Querystring: FindAllCompanyProductQueryRequest }>): FindAllCompanyProductInputDTO {
    const { query, params } = request;
    validateRequest(paginationRequestSchema, { page: query.page, pageSize: query.pageSize });

    return {
      companyId: params.id,
      name: query?.name || '',
      category: query?.category || '',
      active: query?.active,
      isAdditional: query?.isAdditional,
      page: query?.page || 0,
      pageSize: query?.pageSize || 0,
    };
  }

  public toApi(outputDTO: FindAllCompanyProductOutputDTO): FindAllCompanyProductResponse {
    return {
      pagination: outputDTO?.pagination ? {
        page: outputDTO?.pagination?.page ?? 0,
        pageSize: outputDTO?.pagination?.pageSize ?? 0,
        total: outputDTO?.pagination?.total ?? 0,
      } : undefined,
      items: Array.isArray(outputDTO?.items) ? outputDTO.items.map(f => ({
        id: f?.id ?? '',
        companyId: f?.companyId ?? '',
        name: f?.name ?? '',
        category: f?.category ?? '',
        description: f?.description ?? '',
        active: f?.active ?? false,
        isAdditional: f?.isAdditional ?? false,
        imgUrl: f?.imgUrl ?? '',
        price: f?.price ?? 0,
        previewPrice: f?.previewPrice ?? 0,
        additionalList: f?.additionalList ?? [],
      })) : [],
    };
  }
}