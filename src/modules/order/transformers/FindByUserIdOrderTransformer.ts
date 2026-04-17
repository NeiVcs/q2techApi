import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindByUserIdOrderParamsRequest, FindByUserIdOrderQueryRequest, FindByUserIdOrderResponse } from '@modules/order/schemas/FindByUserIdOrderSchema'
import { FindByUserIdOrderInputDTO } from "@modules/order/dto/FindByUserIdOrderInputDTO";
import { FindByUserIdOrderOutputDTO } from "@modules/order/dto/FindByUserIdOrderOutputDTO";

@singleton()
export class FindByUserIdOrderTransformer {
  public fromApi(request?: FastifyRequest<{ Params: FindByUserIdOrderParamsRequest; Querystring: FindByUserIdOrderQueryRequest }>): FindByUserIdOrderInputDTO {
    const { params, query } = request;

    return {
      companyId: params.companyId,
      userId: query?.userId || '',
      status: query?.status || '',
      page: query?.page || 0,
      pageSize: query?.pageSize || 0,
    };
  }

  public toApi(outputDTO: FindByUserIdOrderOutputDTO): FindByUserIdOrderResponse {
    return {
      pagination: outputDTO?.pagination ? {
        page: outputDTO?.pagination?.page ?? 0,
        pageSize: outputDTO?.pagination?.pageSize ?? 0,
        total: outputDTO?.pagination?.total ?? 0,
      } : undefined,
      items: Array.isArray(outputDTO?.items) ? outputDTO.items.map(f => ({
        id: f?.id ?? '',
        companyId: f?.companyId ?? '',
        paymentForm: f?.paymentForm ?? '',
        totalPrice: f?.totalPrice ?? 0,
        payedPrice: f?.payedPrice ?? 0,
        change: f?.change ?? 0,
        deliveryMode: f?.deliveryMode ?? '',
        status: f?.status ?? '',
        rating: f?.rating ?? 0,
        notification: f?.notification ?? '',
        createdAt: f?.createdAt ?? '',
        userData: f?.userData ?? undefined,
        orderData: f?.orderData ?? [],
      })) : [],
    };
  }
}
