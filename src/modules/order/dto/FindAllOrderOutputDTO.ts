import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { OrderDTO } from "@modules/order/dto/OrderDTO";

export interface FindAllOrderOutputDTO {
  pagination?: PaginationDTO;
  items?: OrderDTO[];
}
