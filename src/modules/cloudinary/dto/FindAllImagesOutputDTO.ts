import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { FindAllImagesItemsDTO } from "@modules/cloudinary/dto/FindAllImagesItemsDTO";
import { FindAllImagesLimitDTO } from "./FindAllImagesLimitDTO";

export interface FindAllImagesOutputDTO {
  pagination?: PaginationDTO;
  limit?: FindAllImagesLimitDTO;
  items?: FindAllImagesItemsDTO[];
}