import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindAllUserQueryRequest, FindAllUserResponse } from '@modules/user/schemas/FindAllUserSchema'
import { FindAllUserInputDTO } from "@modules/user/dto/FindAllUserInputDTO";
import { FindAllUserOutputDTO } from "@modules/user/dto/FindAllUserOutputDTO";

@singleton()
export class FindAllUserTransformer {
  public fromApi(request?: FastifyRequest<{ Querystring: FindAllUserQueryRequest }>): FindAllUserInputDTO {
    const { query } = request;

    return {
      page: query?.page || 0,
      pageSize: query?.pageSize || 0,
      companyId: query?.companyId || '',
    };
  }

  public toApi(outputDTO: FindAllUserOutputDTO): FindAllUserResponse {
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
        email: f?.email ?? '',
        cpf: f?.cpf ?? '',
        phoneNumber: f?.phoneNumber ?? '',
        whatsapp: f?.whatsapp ?? '',
        position: f?.position ?? '',
        resource: f?.resource ?? '',
        active: f?.active ?? false,
        address: f?.address ?? undefined,
        plan: f?.plan ?? undefined,
        billing: f?.billing ?? [],
        lastLogin: f?.lastLogin ?? '',
        createdAt: f?.createdAt ?? '',
      })) : [],
    };
  }
}
