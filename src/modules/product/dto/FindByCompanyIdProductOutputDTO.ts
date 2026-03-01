import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { FindByCompanyIdProductItemsItemDTO } from "@modules/product/dto/FindByCompanyIdProductItemsItemDTO";

import { FindByCompanyIdProductAdditionalListItemDTO } from "@modules/product/dto/FindByCompanyIdProductAdditionalListItemDTO";

export interface FindByCompanyIdProductOutputDTO {
  pagination?: PaginationDTO;
  items?: FindByCompanyIdProductItemsItemDTO[];
}