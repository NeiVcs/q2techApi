import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { FindAllOrderItemsItemDTO } from "@modules/order/dto/FindAllOrderItemsDTO";

export interface FindAllOrderOutputDTO {
  pagination?: PaginationDTO;
  items?: FindAllOrderItemsItemDTO[];
}
