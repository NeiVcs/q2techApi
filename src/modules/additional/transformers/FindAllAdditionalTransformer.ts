import { singleton } from 'tsyringe';
import { FindAllAdditionalQueryRequest, FindAllAdditionalResponse } from '@modules/additional/schemas/FindAllAdditionalSchema'
import { FindAllAdditionalOutputDTO } from "@modules/additional/dto/FindAllAdditionalOutputDTO";
import { FastifyRequest } from 'fastify';
import { FindAllAdditionalInputDTO } from '../dto/FindAllAdditionalInputDTO';
import { validateRequest } from '@shared/validateRequest';
import { paginationRequestSchema } from '@shared/validateRequest/validations/paginationRequestSchema';

@singleton()
export class FindAllAdditionalTransformer {
  public fromApi(request?: FastifyRequest<{ Querystring: FindAllAdditionalQueryRequest }>): FindAllAdditionalInputDTO {
    const { query } = request;
    validateRequest(paginationRequestSchema, { page: query.page, pageSize: query.pageSize });

    return {
      page: query?.page || 0,
      pageSize: query?.pageSize || 0,
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
        name: f?.name ?? '',
        min: f?.min,
        max: f?.max,
        productIdList: f?.productIdList ?? [],
      })) : [],
    };
  }
}
