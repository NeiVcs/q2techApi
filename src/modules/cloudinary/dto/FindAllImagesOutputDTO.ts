import { PaginationDTO } from "@shared/dto/PaginationDTO";
import { FindAllImagesItemsItemDTO } from "@modules/cloudinary/dto/FindAllImagesItemsItemDTO";

import { FindAllImagesImagesItemDTO } from "@modules/cloudinary/dto/FindAllImagesImagesItemDTO";

export interface FindAllImagesOutputDTO {
  pagination?: PaginationDTO;
  total_acount?: string;
  items?: FindAllImagesItemsItemDTO[];
}