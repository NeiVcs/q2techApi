import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { CreateOrderBodyRequest, CreateOrderResponse } from '@modules/order/schemas/CreateOrderSchema'
import { CreateOrderInputDTO } from "@modules/order/dto/CreateOrderInputDTO";
import { CreateOrderOutputDTO } from "@modules/order/dto/CreateOrderOutputDTO";

@singleton()
export class CreateOrderTransformer {
  public fromApi(request?: FastifyRequest<{ Body: CreateOrderBodyRequest }>): CreateOrderInputDTO {
    const { body } = request;

    return {
      companyId: body?.companyId || '',
      paymentForm: body?.paymentForm || '',
      totalPrice: body?.totalPrice || 0,
      payedPrice: body?.payedPrice || 0,
      change: body?.change || 0,
      deliveryMode: body?.deliveryMode || '',
      rating: body?.rating || 0,
      notification: body?.notification || '',
      userData: body?.userData ? {
        userId: body?.userData?.userId || '',
        name: body?.userData?.name || '',
        phoneNumber: body?.userData?.phoneNumber || '',
        address: body?.userData?.address ? {
          zipCode: body?.userData?.address?.zipCode || '',
          street: body?.userData?.address?.street || '',
          number: body?.userData?.address?.number || '',
          neighborhood: body?.userData?.address?.neighborhood || '',
          city: body?.userData?.address?.city || '',
          state: body?.userData?.address?.state || '',
          complement: body?.userData?.address?.complement || '',
          reference: body?.userData?.address?.reference || '',
        } : undefined,
      } : undefined,
      orderData: Array.isArray(body?.orderData) ? body.orderData.map(f => ({
        productId: f?.productId || '',
        name: f?.name || '',
        quantity: f?.quantity || 0,
        price: f?.price || 0,
        observation: f?.observation || '',
        status: f?.status || null,
        additional: Array.isArray(f?.additional) ? f.additional.map(f => ({
          additionalId: f?.additionalId || '',
          name: f?.name || '',
          quantity: f?.quantity || 0,
          price: f?.price || 0,
        })) : [],
      })) : [],
    };
  }

  public toApi(outputDTO: CreateOrderOutputDTO): CreateOrderResponse {
    return {
      id: outputDTO?.id ?? '',
    };
  }
}
