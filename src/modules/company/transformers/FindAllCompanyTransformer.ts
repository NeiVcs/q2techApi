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
      pagination: outputDTO.pagination ? {
        page: Number(outputDTO.pagination.page),
        pageSize: Number(outputDTO.pagination.pageSize),
        total: Number(outputDTO.pagination.total),
      } : undefined,
      items: Array.isArray(outputDTO?.items) ? outputDTO.items.map(f => {
        return {
          id: String(f.id),
          name: f.name || '',
          description: f.description || '',
          url: f.url || '',
          closed: !!f.closed,
          minOrderPrice: Number(f.minOrderPrice || 0),
          paymentForms: Array.isArray(f.paymentForms) ? f.paymentForms : [],
          categoriesList: Array.isArray(f.categoriesList) ? f.categoriesList.map(c => ({ ...c })) : [],
          workSchedule: Array.isArray(f.workSchedule) ? f.workSchedule.map(w => ({ ...w })) : [],
          stylization: f.stylization,
          contacts: f.contacts,
          address: f.address
        };
      }) : [],
    };
  }
}
