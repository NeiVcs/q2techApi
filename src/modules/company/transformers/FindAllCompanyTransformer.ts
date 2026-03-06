import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindAllCompanyQueryRequest, FindAllCompanyResponse } from '@modules/company/schemas/FindAllCompanySchema'
import { FindAllCompanyInputDTO } from "@modules/company/dto/FindAllCompanyInputDTO";
import { FindAllCompanyOutputDTO } from "@modules/company/dto/FindAllCompanyOutputDTO";

@singleton()
export class FindAllCompanyTransformer {
  public fromApi(request?: FastifyRequest<{ Querystring: FindAllCompanyQueryRequest }>): FindAllCompanyInputDTO {
    const { query } = request;

    return {
      page: query?.page || 0,
      pageSize: query?.pageSize || 0,
    };
  }

  public toApi(outputDTO: FindAllCompanyOutputDTO): FindAllCompanyResponse {
    return {
      pagination: outputDTO?.pagination ? {
        page: outputDTO?.pagination?.page ?? 0,
        pageSize: outputDTO?.pagination?.pageSize ?? 0,
        total: outputDTO?.pagination?.total ?? 0,
      } : undefined,
      items: Array.isArray(outputDTO?.items) ? outputDTO.items.map(f => ({
        id: f?.id ?? '',
        name: f?.name ?? '',
        description: f?.description ?? '',
        url: f?.url ?? '',
        closed: f?.closed ?? false,
        minOrderPrice: f?.minOrderPrice ?? 0,
        categoriesList: f?.categoriesList ?? [],
        stylization: f?.stylization ?? undefined,
        contacts: f?.contacts ?? undefined,
        address: f?.address ?? undefined,
        workSchedule: f?.workSchedule ?? [],
        paymentForms: f?.paymentForms ?? [],
      })) : [],
    };
  }
}
