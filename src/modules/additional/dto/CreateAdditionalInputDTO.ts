import { ProductListDTO } from "./ProductListDTO";

export interface CreateAdditionalInputDTO {
  companyId: string;
  category: string;
  name: string;
  min: number;
  max: number;
  productList: ProductListDTO[];
}
