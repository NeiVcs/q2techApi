import { OrderUserDataDTO } from "./OrderUserDataDTO";
import { OrderDataItemDTO } from "./OrderDataItemDTO";

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
