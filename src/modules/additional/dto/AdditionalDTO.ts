import { ProductListDTO } from "./ProductListDTO";

export interface AdditionalDTO {
  id?: string;
  companyId: string;
  category: string;
  name?: string;
  min?: number;
  max?: number;
  productList?: ProductListDTO[];
}
