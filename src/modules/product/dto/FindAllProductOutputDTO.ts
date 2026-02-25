import { FindAllProductItemsItemDTO } from "@modules/product/dto/FindAllProductItemsItemDTO";

import { FindAllProductAdditionalListItemDTO } from "@modules/product/dto/FindAllProductAdditionalListItemDTO";

export interface FindAllProductOutputDTO {
  items?: FindAllProductItemsItemDTO[];
}