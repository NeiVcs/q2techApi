export interface FindAllProductAdditionalListItemDTO {
  id?: string;
  name?: string;
  min?: number;
  max?: number;
  productList?: FindAllProductProductListItemDTO[];
}