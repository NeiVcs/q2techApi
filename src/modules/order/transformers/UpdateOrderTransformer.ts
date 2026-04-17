import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { UpdateOrderBodyRequest, UpdateOrderParamsRequest } from '@modules/order/schemas/UpdateOrderSchema'
import { UpdateOrderInputDTO } from "@modules/order/dto/UpdateOrderInputDTO";

@singleton()
export class UpdateOrderTransformer {
  public fromApi(request?: FastifyRequest<{ Body: UpdateOrderBodyRequest; Params: UpdateOrderParamsRequest }>): UpdateOrderInputDTO {
    const { params, body } = request;

    return {
      id: params.id,
      orderId: body?.orderId || '',
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
}
