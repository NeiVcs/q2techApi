import { OrderDataItemDTO } from "./OrderDataItemDTO";
import { OrderUserDataDTO } from "./OrderUserDataDTO";

export interface FindByCompanyIdOrderItemsDTO {
  id?: string;
  companyId?: string;
  paymentForm?: string;
  totalPrice?: number;
  payedPrice?: number;
  change?: number;
  deliveryMode?: string;
  status?: string;
  rating?: number;
  notification?: string;
  createdAt?: string;
  userData?: OrderUserDataDTO;
  orderData?: OrderDataItemDTO[];
}
