import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindByIdCompanyParamsRequest, FindByIdCompanyResponse } from '@modules/company/schemas/FindByIdCompanySchema'
import { FindByIdCompanyInputDTO } from "@modules/company/dto/FindByIdCompanyInputDTO";
import { FindByIdCompanyOutputDTO } from "@modules/company/dto/FindByIdCompanyOutputDTO";
import { ICompany } from '../data/ICompany';

@singleton()
export class FindByIdCompanyTransformer {
  public fromApi(request?: FastifyRequest<{ Params: FindByIdCompanyParamsRequest }>): FindByIdCompanyInputDTO {
    const { params } = request;

    return {
      id: params.id,
    };
  }

  public toApi(outputDTO: FindByIdCompanyOutputDTO): FindByIdCompanyResponse {
    return {
      id: outputDTO?.id ?? '',
      name: outputDTO?.name ?? '',
      description: outputDTO?.description ?? '',
      url: outputDTO?.url ?? '',
      closed: outputDTO?.closed ?? false,
      alert: outputDTO?.alert ?? '',
      minOrderPrice: outputDTO?.minOrderPrice ?? null,
      categoriesList: Array.isArray(outputDTO?.categoriesList) ? outputDTO.categoriesList.map(f => ({
        name: f?.name ?? '',
        icon: f?.icon ?? '',
      })) : [],
      plan: Array.isArray(outputDTO?.plan) ? outputDTO.plan.map(f => ({
        name: f?.name ?? '',
        value: f?.value ?? 0,
        validate: f?.validate ?? '',
      })) : [],
      stylization: outputDTO?.stylization ? {
        hasImage: outputDTO?.stylization?.hasImage ?? false,
        primaryColor: outputDTO?.stylization?.primaryColor ?? '',
        secondaryColor: outputDTO?.stylization?.secondaryColor ?? '',
        logo: outputDTO?.stylization?.logo ?? '',
        header: outputDTO?.stylization?.header ?? '',
      } : undefined,
      contacts: outputDTO?.contacts ? {
        phoneNumberList: outputDTO?.contacts?.phoneNumberList ?? [],
        whatsappNumberList: outputDTO?.contacts?.whatsappNumberList ?? [],
        emailList: outputDTO?.contacts?.emailList ?? [],
      } : undefined,
      socialMediasList: Array.isArray(outputDTO?.socialMediasList) ? outputDTO.socialMediasList.map(f => ({
        name: f?.name ?? '',
        url: f?.url ?? '',
      })) : [],
      address: outputDTO?.address ? {
        zipCode: outputDTO?.address?.zipCode ?? '',
        street: outputDTO?.address?.street ?? '',
        number: outputDTO?.address?.number ?? '',
        neighborhood: outputDTO?.address?.neighborhood ?? '',
        city: outputDTO?.address?.city ?? '',
        state: outputDTO?.address?.state ?? '',
        complement: outputDTO?.address?.complement ?? '',
      } : undefined,
      workSchedule: Array.isArray(outputDTO?.workSchedule) ? outputDTO.workSchedule.map(f => ({
        weekday: f?.weekday ?? '',
        start: f?.start ?? '',
        end: f?.end ?? '',
      })) : [],
      paymentForms: Array.isArray(outputDTO?.paymentForms) ? [...outputDTO.paymentForms] : [],
    };
  }

  public toDto(request?: ICompany): FindByIdCompanyOutputDTO {
    return {
      id: request._id.toString(),
      name: request.name,
      description: request.description,
      url: request.url,
      closed: request.closed,
      alert: request.alert,
      minOrderPrice: request.minOrderPrice,
      categoriesList: request.categoriesList?.map(cat => ({
        name: cat.name,
        icon: cat.icon,
      })) || [],
      plan: request.plan?.map(plan => ({
        name: plan.name,
        value: plan.value,
        validate: plan.validate
      })) || [],
      stylization: {
        hasImage: request.stylization?.hasImage,
        primaryColor: request.stylization?.primaryColor,
        secondaryColor: request.stylization?.secondaryColor,
        logo: request.stylization?.logo,
        header: request.stylization?.header,
      },
      contacts: {
        phoneNumberList: request.contacts?.phoneNumberList,
        whatsappNumberList: request.contacts?.whatsappNumberList,
        emailList: request.contacts?.emailList
      },
      socialMediasList: request.categoriesList?.map(cat => ({
        name: cat.name,
        icon: cat.icon,
      })) || [],
      address: {
        zipCode: request.address?.zipCode,
        street: request.address?.street,
        number: request.address?.number,
        neighborhood: request.address?.neighborhood,
        city: request.address?.city,
        state: request.address?.state,
        complement: request.address?.complement,
      },
      workSchedule: request.workSchedule?.map(work => ({
        weekday: work.weekday,
        start: work.start,
        end: work.end,
      })) || [],
      paymentForms: request.paymentForms || [],
    };
  }
}
