import { ProductListDTO } from "./ProductListDTO";

export interface UpdateAdditionalInputDTO {
  id: string;
  companyId?: string;
  category?: string;
  name?: string;
  min?: number;
  max?: number;
  productList?: ProductListDTO[];
}
