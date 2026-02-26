import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindAllProductQueryRequest, FindAllProductResponse } from '@modules/product/schemas/FindAllProductSchema'
import { FindAllProductInputDTO } from "@modules/product/dto/FindAllProductInputDTO";
import { FindAllProductOutputDTO } from "@modules/product/dto/FindAllProductOutputDTO";
import { validateRequest } from '@shared/validateRequest';
import { paginationRequestSchema } from '@shared/validateRequest/validations/paginationRequestSchema';

@singleton()
export class FindAllProductTransformer {
  public fromApi(request?: FastifyRequest<{ Querystring: FindAllProductQueryRequest }>): FindAllProductInputDTO {
    const { query } = request;
    validateRequest(paginationRequestSchema, { page: query.page, pageSize: query.pageSize });

    return {
      companyId: query?.companyId || '',
      name: query?.name || '',
      category: query?.category || '',
      active: query?.active,
      isAdditional: query?.isAdditional,
      page: query?.page || 0,
      pageSize: query?.pageSize || 0,
    };
  }

  public toApi(outputDTO: FindAllProductOutputDTO): FindAllProductResponse {
    console.log(
      outputDTO?.pagination ? {
        page: outputDTO?.pagination?.page ?? 0,
        pageSize: outputDTO?.pagination?.pageSize ?? 0,
        total: outputDTO?.pagination?.total ?? 0,
      } : 'nao'
    )
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
        active: f?.active,
        isAdditional: f?.isAdditional,
        imgUrl: f?.imgUrl ?? '',
        price: f?.price ?? 0,
        previewPrice: f?.previewPrice ?? 0,
        additionalList: f?.additionalList.length > 0 ? f?.additionalList : null,
      })) : [],
    };
  }
}
