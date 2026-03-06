import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { UserItemsDTO } from "./UserItemsDTO";

export interface FindAllUserOutputDTO {
  pagination?: PaginationDTO;
  items?: UserItemsDTO[];
}