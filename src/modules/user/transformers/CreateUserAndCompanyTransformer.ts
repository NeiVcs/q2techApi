import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { CreateUserAndCompanyBodyRequest, CreateUserAndCompanyResponse } from '@modules/user/schemas/CreateUserAndCompanySchema'
import { CreateUserAndCompanyInputDTO } from "@modules/user/dto/CreateUserAndCompanyInputDTO";
import { CreateUserAndCompanyOutputDTO } from "@modules/user/dto/CreateUserAndCompanyOutputDTO";

@singleton()
export class CreateUserAndCompanyTransformer {
  public fromApi(request: FastifyRequest<{ Body: CreateUserAndCompanyBodyRequest }>): CreateUserAndCompanyInputDTO {
    const body = request.body as any;

    return {
      user: body?.user ? {
        name: body.user.name || '',
        password: body.user.password || '',
        taxId: body.user.taxId || '',
        email: body.user.email || '',
        phoneNumber: body.user.phoneNumber || '',
        whatsapp: body.user.whatsapp || '',
        active: body.user.active ?? true,
        companyDataList: Array.isArray(body.user.companyDataList) ? body.user.companyDataList.map((f: any) => ({
          companyId: f?.companyId || '',
          resource: f?.resource || '',
          plan: f?.plan ? {
            name: f.plan.name || '',
            value: f.plan.value || 0,
            validate: f.plan.validate || '',
          } : undefined,
        })) : [],
      } : undefined,
      company: body?.company ? {
        name: body.company.name || '',
        description: body.company.description || '',
        url: body.company.url || '',
        closed: body.company.closed ?? false,
        alert: body.company.alert || '',
        minOrderPrice: body.company.minOrderPrice || 0,
        categoriesList: Array.isArray(body.company.categoriesList) ? body.company.categoriesList.map((f: any) => ({
          name: f?.name || '',
          icon: f?.icon || '',
        })) : [],
        stylization: body.company.stylization ? {
          hasImage: body.company.stylization.hasImage ?? false,
          primaryColor: body.company.stylization.primaryColor || '',
          secondaryColor: body.company.stylization.secondaryColor || '',
          logo: body.company.stylization.logo || '',
          header: body.company.stylization.header || '',
        } : undefined,
        contacts: body.company.contacts ? {
          phoneNumberList: Array.isArray(body.company.contacts.phoneNumberList) ? [...body.company.contacts.phoneNumberList] : [],
          whatsappNumberList: Array.isArray(body.company.contacts.whatsappNumberList) ? [...body.company.contacts.whatsappNumberList] : [],
          emailList: Array.isArray(body.company.contacts.emailList) ? [...body.company.contacts.emailList] : [],
        } : undefined,
        address: body.company.address ? {
          zipCode: body.company.address.zipCode || '',
          street: body.company.address.street || '',
          neighborhood: body.company.address.neighborhood || '',
          number: body.company.address.number || '',
          city: body.company.address.city || '',
          state: body.company.address.state || '',
        } : undefined,
        workSchedule: body.company.workSchedule
          ? Object.fromEntries(
            Object.entries(body.company.workSchedule).filter(([_, value]) => value !== undefined)
          ) : undefined,
        paymentForms: Array.isArray(body.company.paymentForms) ? [...body.company.paymentForms] : [],
      } : undefined,
    };
  }

  public toApi(outputDTO: CreateUserAndCompanyOutputDTO): CreateUserAndCompanyResponse {
    return {
      token: outputDTO?.token ?? '',
    };
  }
}
