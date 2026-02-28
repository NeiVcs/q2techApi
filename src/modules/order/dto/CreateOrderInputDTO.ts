import { CreateOrderUserDataDTO } from "@modules/order/dto/CreateOrderUserDataDTO";
import { CreateOrderAddressDTO } from "@modules/order/dto/CreateOrderAddressDTO";
import { CreateOrderOrderDataItemDTO } from "@modules/order/dto/CreateOrderOrderDataItemDTO";
import { CreateOrderAdditionalItemDTO } from "@modules/order/dto/CreateOrderAdditionalItemDTO";

export interface CreateOrderInputDTO {
  companyId: string;
  paymentForm: string;
  totalPrice: number;
  payedPrice?: number;
  change?: number;
  deliveryMode: string;
  rating?: number;
  notification?: string;
  userData: CreateOrderUserDataDTO;
  orderData: CreateOrderOrderDataItemDTO[];
}
    
    