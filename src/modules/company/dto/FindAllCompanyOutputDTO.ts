import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { FindAllCompanyItemsDTO } from "@modules/company/dto/FindAllCompanyItemsDTO";

export interface FindAllCompanyOutputDTO {
  pagination?: PaginationDTO;
  items?: FindAllCompanyItemsDTO;
}
