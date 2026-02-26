import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { FindAllCompanyProductItemsItemDTO } from "@modules/product/dto/FindAllCompanyProductItemsItemDTO";

import { FindAllCompanyProductAdditionalListItemDTO } from "@modules/product/dto/FindAllCompanyProductAdditionalListItemDTO";

export interface FindAllCompanyProductOutputDTO {
  pagination?: PaginationDTO;
  items?: FindAllCompanyProductItemsItemDTO[];
}