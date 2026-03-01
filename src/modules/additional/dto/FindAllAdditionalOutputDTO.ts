import { AdditionalDTO } from "@modules/additional/dto/AdditionalDTO";
import { PaginationDTO } from "@shared/dto/PaginationDTO";

export interface FindAllAdditionalOutputDTO {
  pagination?: PaginationDTO;
  items?: AdditionalDTO[];
}