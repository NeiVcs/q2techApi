import { singleton } from 'tsyringe';
import {FastifyRequest} from 'fastify';
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
      companyId: outputDTO?.companyId ?? '',
      name: outputDTO?.name ?? '',
      email: outputDTO?.email ?? '',
      cpf: outputDTO?.cpf ?? '',
      phoneNumber: outputDTO?.phoneNumber ?? '',
      whatsapp: outputDTO?.whatsapp ?? '',
      position: outputDTO?.position ?? '',
      resource: outputDTO?.resource ?? '',
      active: outputDTO?.active ?? false,
      address: outputDTO?.address ? {
        zipCode: outputDTO?.address?.zipCode ?? '',
        street: outputDTO?.address?.street ?? '',
        number: outputDTO?.address?.number ?? '',
        neighborhood: outputDTO?.address?.neighborhood ?? '',
        city: outputDTO?.address?.city ?? '',
        state: outputDTO?.address?.state ?? '',
        complement: outputDTO?.address?.complement ?? '',
      } : undefined,
      plan: outputDTO?.plan ? {
        name: outputDTO?.plan?.name ?? '',
        value: outputDTO?.plan?.value ?? 0,
        validate: outputDTO?.plan?.validate ?? '',
      } : undefined,
      billing: Array.isArray(outputDTO?.billing) ? outputDTO.billing.map(f => ({
        dueDate: f?.dueDate ?? '',
        value: f?.value ?? 0,
        status: f?.status ?? '',
      })) : [],
      lastLogin: outputDTO?.lastLogin ?? '',
      createdAt: outputDTO?.createdAt ?? '',
    };
  }
}
  