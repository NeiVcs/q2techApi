
import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { FindAllProductDTO } from "./FindAllProductItemsItemDTO";

export interface FindAllProductOutputDTO {
  pagination?: PaginationDTO;
  items?: FindAllProductDTO[];
}
