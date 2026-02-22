import { FindAllProductItemsItemDTO } from "@modules/product/dto/FindAllProductItemsItemDTO";

import { FindAllProductAdditionalListItemDTO } from "@modules/product/dto/FindAllProductAdditionalListItemDTO";

import { FindAllProductProductListItemDTO } from "@modules/product/dto/FindAllProductProductListItemDTO";

export interface FindAllProductOutputDTO {
  items?: FindAllProductItemsItemDTO[];
}