import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { OrderDTO } from "./OrderDTO";

export interface FindByUserIdOrderOutputDTO {
  pagination?: PaginationDTO;
  items?: OrderDTO[];
}