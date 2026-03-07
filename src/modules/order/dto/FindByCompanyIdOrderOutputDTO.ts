import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { FindByCompanyIdOrderItemsDTO } from "@modules/order/dto/FindByCompanyIdOrderItemsDTO";

export interface FindByCompanyIdOrderOutputDTO {
  pagination?: PaginationDTO;
  items?: FindByCompanyIdOrderItemsDTO[];
}
