import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { format } from 'date-fns';
import { CreateUserBodyRequest, CreateUserResponse } from '@modules/user/schemas/CreateUserSchema'
import { CreateUserInputDTO } from "@modules/user/dto/CreateUserInputDTO";
import { CreateUserOutputDTO } from "@modules/user/dto/CreateUserOutputDTO";

@singleton()
export class CreateUserTransformer {
  public fromApi(request?: FastifyRequest<{ Body: CreateUserBodyRequest }>): CreateUserInputDTO {
    const { body } = request;

    return {
      name: body?.name || '',
      password: body?.password || '',
      taxId: body?.taxId || '',
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
      createdAt: format(new Date(), 'yyyy-MM-dd')
    };
  }

  public toApi(outputDTO: CreateUserOutputDTO): CreateUserResponse {
    return {
      id: outputDTO?.id ?? '',
    };
  }
}
