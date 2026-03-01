import { OrderAdditionalDTO } from "./OrderAdditionalDTO";

export interface UpdateOrderOrderDataItemDTO {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  observation?: string;
  additional?: OrderAdditionalDTO[];
}
