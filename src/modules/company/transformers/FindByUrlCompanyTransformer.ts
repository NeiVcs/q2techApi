import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindByUrlCompanyInputDTO } from "@modules/company/dto/FindByUrlCompanyInputDTO";
import { FindByUrlCompanyOutputDTO } from "@modules/company/dto/FindByUrlCompanyOutputDTO";
import { FindByUrlCompanyParamsRequest, FindByUrlCompanyResponse } from '../schemas/FindByUrlCompanySchema';
import { ICompany } from '../data/ICompany';

@singleton()
export class FindByUrlCompanyTransformer {
  public fromApi(request?: FastifyRequest<{ Params: FindByUrlCompanyParamsRequest }>): FindByUrlCompanyInputDTO {
    const { params } = request;

    return {
      url: params.url,
    };
  }

  public toApi(outputDTO: FindByUrlCompanyOutputDTO): FindByUrlCompanyResponse {
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
      workSchedule: {
        0: outputDTO?.workSchedule?.[0] || null,
        1: outputDTO?.workSchedule?.[1] || null,
        2: outputDTO?.workSchedule?.[2] || null,
        3: outputDTO?.workSchedule?.[3] || null,
        4: outputDTO?.workSchedule?.[4] || null,
        5: outputDTO?.workSchedule?.[5] || null,
        6: outputDTO?.workSchedule?.[6] || null,
        7: outputDTO?.workSchedule?.[7] || null,
      },
      paymentForms: Array.isArray(outputDTO?.paymentForms) ? [...outputDTO.paymentForms] : [],
    };
  }

  public toDto(request?: ICompany): FindByUrlCompanyOutputDTO {
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
      workSchedule: {
        0: request?.workSchedule?.[0] || null,
        1: request?.workSchedule?.[1] || null,
        2: request?.workSchedule?.[2] || null,
        3: request?.workSchedule?.[3] || null,
        4: request?.workSchedule?.[4] || null,
        5: request?.workSchedule?.[5] || null,
        6: request?.workSchedule?.[6] || null,
        7: request?.workSchedule?.[7] || null,
      },
      paymentForms: request.paymentForms || [],
    };
  }
}
