import { CreateOrderAdditionalItemDTO } from "./CreateOrderAdditionalItemDTO";

export interface CreateOrderOrderDataItemDTO {
  productId: string;
  name: string;
  quantity: number;
  price: number;
  observation?: string;
  additional?: CreateOrderAdditionalItemDTO[];
}