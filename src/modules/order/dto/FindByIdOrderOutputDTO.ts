import { OrderDataItemDTO } from "./OrderDataItemDTO";
import { OrderUserDataDTO } from "./OrderUserDataDTO";

export interface FindByIdOrderOutputDTO {
  id: string;
  companyId?: string;
  status?: string;
  paymentForm?: string;
  totalPrice?: number;
  payedPrice?: number;
  change?: number;
  deliveryMode?: string;
  rating?: number;
  notification?: string;
  createdAt?: string;
  userData?: OrderUserDataDTO;
  orderData?: OrderDataItemDTO[];
}