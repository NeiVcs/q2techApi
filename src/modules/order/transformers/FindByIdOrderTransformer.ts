import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindByIdOrderParamsRequest, FindByIdOrderResponse } from '@modules/order/schemas/FindByIdOrderSchema'
import { FindByIdOrderInputDTO } from "@modules/order/dto/FindByIdOrderInputDTO";
import { FindByIdOrderOutputDTO } from "@modules/order/dto/FindByIdOrderOutputDTO";

@singleton()
export class FindByIdOrderTransformer {
  public fromApi(request?: FastifyRequest<{ Params: FindByIdOrderParamsRequest }>): FindByIdOrderInputDTO {
    const { params } = request;

    return {
      id: params.id,
    };
  }

  public toApi(outputDTO: FindByIdOrderOutputDTO): FindByIdOrderResponse {
    console.log(outputDTO)
    return {
      id: outputDTO?.id ?? '',
      companyId: outputDTO?.companyId ?? '',
      status: outputDTO?.status ?? '',
      paymentForm: outputDTO?.paymentForm ?? '',
      totalPrice: outputDTO?.totalPrice ?? 0,
      payedPrice: outputDTO?.payedPrice ?? 0,
      change: outputDTO?.change ?? 0,
      deliveryMode: outputDTO?.deliveryMode ?? '',
      rating: outputDTO?.rating ?? 0,
      notification: outputDTO?.notification ?? '',
      createdAt: outputDTO?.createdAt ?? '',
      userData: outputDTO?.userData ? {
        userId: outputDTO?.userData?.userId ?? '',
        name: outputDTO?.userData?.name ?? '',
        phoneNumber: outputDTO?.userData?.phoneNumber ?? '',
        address: outputDTO?.userData?.address ?? undefined,
      } : undefined,
      orderData: Array.isArray(outputDTO?.orderData) ? outputDTO.orderData.map(f => ({
        productId: f?.productId ?? '',
        name: f?.name ?? '',
        quantity: f?.quantity ?? 0,
        price: f?.price ?? 0,
        observation: f?.observation ?? '',
        status: f?.status ?? '',
        additional: f?.additional ?? [],
      })) : [],
    };
  }
}
