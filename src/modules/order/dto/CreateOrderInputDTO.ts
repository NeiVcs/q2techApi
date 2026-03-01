import { OrderDataItemDTO } from "./OrderDataItemDTO";
import { OrderUserDataDTO } from "./OrderUserDataDTO";

export interface CreateOrderInputDTO {
  companyId: string;
  paymentForm: string;
  totalPrice: number;
  payedPrice?: number;
  change?: number;
  deliveryMode: string;
  rating?: number;
  notification?: string;
  userData: OrderUserDataDTO;
  orderData: OrderDataItemDTO[];
}
