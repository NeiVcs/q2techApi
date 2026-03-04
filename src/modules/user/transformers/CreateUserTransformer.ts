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
      companyId: body?.companyId || '',
      name: body?.name || '',
      password: body?.password || '',
      cpf: body?.cpf || '',
      email: body?.email || '',
      phoneNumber: body?.phoneNumber || '',
      whatsapp: body?.whatsapp || '',
      position: body?.position || '',
      resource: body?.resource || '',
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
      plan: body?.plan ? {
        name: body?.plan?.name || '',
        value: body?.plan?.value || 0,
        validate: body?.plan?.validate || '',
      } : undefined,
      billing: Array.isArray(body?.billing) ? body.billing.map(f => ({
        dueDate: f?.dueDate || '',
        value: f?.value || 0,
        status: f?.status || '',
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
