import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindByCompanyIdTableStatusParamsRequest, FindByCompanyIdTableStatusResponse } from '@modules/tableStatus/schemas/FindByCompanyIdTableStatusSchema'
import { FindByCompanyIdTableStatusInputDTO } from "@modules/tableStatus/dto/FindByCompanyIdTableStatusInputDTO";
import { FindByCompanyIdTableStatusOutputDTO } from "@modules/tableStatus/dto/FindByCompanyIdTableStatusOutputDTO";

@singleton()
export class FindByCompanyIdTableStatusTransformer {
  public fromApi(request?: FastifyRequest<{ Params: FindByCompanyIdTableStatusParamsRequest }>): FindByCompanyIdTableStatusInputDTO {
    const { params } = request;

    return {
      companyId: params.companyId,
    };
  }

  public toApi(outputDTO: FindByCompanyIdTableStatusOutputDTO): FindByCompanyIdTableStatusResponse {
    return {
      items: Array.isArray(outputDTO?.items) ? outputDTO.items.map(f => ({
        id: f?.id ?? '',
        companyId: f?.companyId ?? '',
        userId: f?.userId ?? '',
        status: f?.status ?? '',
      })) : [],
      id: undefined
    };
  }
}
