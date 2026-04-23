import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindByIdUserParamsRequest, FindByIdUserResponse } from '@modules/user/schemas/FindByIdUserSchema'
import { FindByIdUserInputDTO } from "@modules/user/dto/FindByIdUserInputDTO";
import { FindByIdUserOutputDTO } from "@modules/user/dto/FindByIdUserOutputDTO";

@singleton()
export class FindByIdUserTransformer {
  public fromApi(request?: FastifyRequest<{ Params: FindByIdUserParamsRequest }>): FindByIdUserInputDTO {
    const { params } = request;

    return {
      id: params.id,
    };
  }

  public toApi(outputDTO: FindByIdUserOutputDTO): FindByIdUserResponse {
    return {
      id: outputDTO?.id ?? '',
      name: outputDTO?.name ?? '',
      email: outputDTO?.email ?? '',
      taxId: outputDTO?.taxId ?? '',
      phoneNumber: outputDTO?.phoneNumber ?? '',
      whatsapp: outputDTO?.whatsapp ?? '',
      active: outputDTO?.active ?? false,
      companyDataList: Array.isArray(outputDTO?.companyDataList) ? outputDTO.companyDataList.map(f => ({
        companyId: f?.companyId ?? '',
        resource: f?.resource ?? '',
        plan: f?.plan ?? undefined,
        billing: f?.billing ?? [],
      })) : [],
      lastLogin: outputDTO?.lastLogin ?? '',
      createdAt: outputDTO?.createdAt ?? '',
    };
  }
}
