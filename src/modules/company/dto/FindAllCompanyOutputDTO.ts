import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { FindAllCompanyItemsDTO } from "./FindAllCompanyItemsDTO";

export interface FindAllCompanyOutputDTO {
  pagination?: PaginationDTO;
  items?: FindAllCompanyItemsDTO[];
}
