export interface OrderAdditionalDTO {
  [x: string]: unknown;
  additionalId: string;
  name: string;
  quantity: number;
  price: number;
}