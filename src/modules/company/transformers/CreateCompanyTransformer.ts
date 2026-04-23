import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { CreateCompanyBodyRequest, CreateCompanyResponse } from '@modules/company/schemas/CreateCompanySchema'
import { CreateCompanyInputDTO } from "@modules/company/dto/CreateCompanyInputDTO";
import { CreateCompanyOutputDTO } from "@modules/company/dto/CreateCompanyOutputDTO";

@singleton()
export class CreateCompanyTransformer {
  public fromApi(request?: FastifyRequest<{ Body: CreateCompanyBodyRequest }>): CreateCompanyInputDTO {
    const { body } = request;

    return {
      name: body?.name || '',
      description: body?.description || '',
      url: body?.url || '',
      closed: body?.closed || false,
      alert: body?.alert || '',
      minOrderPrice: body?.minOrderPrice || 0,
      categoriesList: Array.isArray(body?.categoriesList) ? body.categoriesList.map(f => ({
        name: f?.name || '',
        icon: f?.icon || '',
      })) : [],
      stylization: body?.stylization ? {
        hasImage: body?.stylization?.hasImage || false,
        primaryColor: body?.stylization?.primaryColor || '',
        secondaryColor: body?.stylization?.secondaryColor || '',
        logo: body?.stylization?.logo || '',
        header: body?.stylization?.header || '',
      } : undefined,
      contacts: body?.contacts ? {
        phoneNumberList: Array.isArray(body?.contacts?.phoneNumberList) ? [...body?.contacts.phoneNumberList] : [],
        whatsappNumberList: Array.isArray(body?.contacts?.whatsappNumberList) ? [...body?.contacts.whatsappNumberList] : [],
        emailList: Array.isArray(body?.contacts?.emailList) ? [...body?.contacts.emailList] : [],
      } : undefined,
      address: body?.address ? {
        zipCode: body?.address?.zipCode || '',
        street: body?.address?.street || '',
        number: body?.address?.number || '',
        neighborhood: body?.address?.neighborhood || '',
        city: body?.address?.city || '',
        state: body?.address?.state || '',
        complement: body?.address?.complement || '',
      } : undefined,
      workSchedule: body?.workSchedule
        ? Object.fromEntries(
          Object.entries(body?.workSchedule).filter(([_, value]) => value !== undefined)
        ) : undefined,
      paymentForms: Array.isArray(body?.paymentForms) ? [...body.paymentForms] : [],
    };
  }

  public toApi(outputDTO: CreateCompanyOutputDTO): CreateCompanyResponse {
    return {
      id: outputDTO?.id ?? '',
    };
  }
}
