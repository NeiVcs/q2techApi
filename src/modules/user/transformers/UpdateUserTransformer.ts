import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { UpdateUserBodyRequest, UpdateUserParamsRequest } from '@modules/user/schemas/UpdateUserSchema'
import { UpdateUserInputDTO } from "@modules/user/dto/UpdateUserInputDTO";

@singleton()
export class UpdateUserTransformer {
  public fromApi(request?: FastifyRequest<{ Body: UpdateUserBodyRequest; Params: UpdateUserParamsRequest }>): UpdateUserInputDTO {
    const { params, body } = request;

    return {
      id: params.id,
      name: body?.name || '',
      email: body?.email || '',
      phoneNumber: body?.phoneNumber || '',
      whatsapp: body?.whatsapp || '',
      active: body?.active || false,
      address: body?.address ? {
        zipCode: body?.address?.zipCode || '',
        street: body?.address?.street || '',
        number: body?.address?.number || '',
        neighborhood: body?.address?.neighborhood || '',
        city: body?.address?.city || '',
        state: body?.address?.state || '',
        complement: body?.address?.complement || '',
      } : undefined,
      companyDataList: Array.isArray(body?.companyDataList) ? body.companyDataList.map(f => ({
        companyId: f?.companyId || '',
        resource: f?.resource || '',
        plan: f?.plan ? {
          name: f?.plan?.name || '',
          value: f?.plan?.value || 0,
          validate: f?.plan?.validate || '',
        } : undefined,
        billing: Array.isArray(f?.billing) ? f.billing.map(f => ({
          dueDate: f?.dueDate || '',
          value: f?.value || 0,
          status: f?.status || '',
        })) : [],
      })) : [],
      lastLogin: body?.lastLogin || '',
    };
  }
}
