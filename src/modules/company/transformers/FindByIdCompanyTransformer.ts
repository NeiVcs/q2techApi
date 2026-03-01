import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindByIdCompanyParamsRequest, FindByIdCompanyResponse } from '@modules/company/schemas/FindByIdCompanySchema'
import { FindByIdCompanyInputDTO } from "@modules/company/dto/FindByIdCompanyInputDTO";
import { FindByIdCompanyOutputDTO } from "@modules/company/dto/FindByIdCompanyOutputDTO";

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
}
