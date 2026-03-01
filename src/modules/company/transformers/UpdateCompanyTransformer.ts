import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { UpdateCompanyBodyRequest, UpdateCompanyParamsRequest } from '@modules/company/schemas/UpdateCompanySchema'
import { UpdateCompanyInputDTO } from "@modules/company/dto/UpdateCompanyInputDTO";

@singleton()
export class UpdateCompanyTransformer {
  public fromApi(request?: FastifyRequest<{ Body: UpdateCompanyBodyRequest; Params: UpdateCompanyParamsRequest }>): UpdateCompanyInputDTO {
    const { params, body } = request;

    return {
      id: params.id,
      name: body?.name || '',
      description: body?.description || '',
      url: body?.url || '',
      closed: body?.closed || false,
      alert: body?.alert || '',
      minOderPrice: body?.minOderPrice || 0,
      categoriesList: Array.isArray(body?.categoriesList) ? body.categoriesList.map(f => ({
        name: f?.name || '',
        icon: f?.icon || '',
      })) : [],
      plan: Array.isArray(body?.plan) ? body.plan.map(f => ({
        name: f?.name || '',
        value: f?.value || 0,
        validate: f?.validate || '',
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
      workSchedule: Array.isArray(body?.workSchedule) ? body.workSchedule.map(f => ({
        weekday: f?.weekday || '',
        start: f?.start || '',
        end: f?.end || '',
      })) : [],
      paymentForms: Array.isArray(body?.paymentForms) ? [...body.paymentForms] : [],
    };
  }
}
