import { OrderAdditionalDTO } from "./OrderAdditionalDTO";

export interface OrderDataItemDTO {
  [x: string]: unknown;
  productId: string;
  name: string;
  quantity: number;
  price: number;
  observation?: string;
  additional?: OrderAdditionalDTO[];
}
