import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { UserItemsDTO } from "@modules/user/dto/UserItemsDTO";

export interface FindAllUserOutputDTO {
  pagination?: PaginationDTO;
  items?: UserItemsDTO[];
}
