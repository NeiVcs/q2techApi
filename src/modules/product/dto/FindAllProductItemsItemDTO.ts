export interface FindAllProductItemsItemDTO {
  id?: string;
  companyId?: string;
  name?: string;
  category?: string;
  description?: string;
  active?: boolean;
  isAdditional?: boolean;
  imgUrl?: string;
  price?: number;
  previewPrice?: number;
  additionalList?: any[];
}
