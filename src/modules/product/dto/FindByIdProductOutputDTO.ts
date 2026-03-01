import { FindByIdProductAdditionalListItemDTO } from "@modules/product/dto/FindByIdProductAdditionalListItemDTO";

export interface FindByIdProductOutputDTO {
  id: string;
  companyId?: string;
  name?: string;
  category?: string;
  description?: string;
  active?: boolean;
  isAdditional?: boolean;
  imgUrl?: string;
  price?: number;
  previewPrice?: number;
  additionalList?: FindByIdProductAdditionalListItemDTO[];
}