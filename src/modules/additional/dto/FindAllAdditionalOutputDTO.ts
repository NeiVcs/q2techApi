import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { AdditionalDTO } from "./AdditionalDTO";

export interface FindAllAdditionalOutputDTO {
  pagination?: PaginationDTO;
  items?: AdditionalDTO[];
}