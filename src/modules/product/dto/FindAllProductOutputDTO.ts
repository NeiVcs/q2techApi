import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { FindAllProductDTO } from "@modules/product/dto/FindAllProductItemsItemDTO";

export interface FindAllProductOutputDTO {
  pagination?: PaginationDTO;
  items?: FindAllProductDTO[];
}
