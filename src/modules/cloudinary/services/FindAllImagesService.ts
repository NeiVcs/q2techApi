import { singleton } from 'tsyringe';

import { FindAllImagesInputDTO } from "@modules/cloudinary/dto/FindAllImagesInputDTO";
//import { CloudinaryRepository } from "@modules/cloudinary/data/CloudinaryRepository";
import { FindAllImagesOutputDTO } from "@modules/cloudinary/dto/FindAllImagesOutputDTO";
import cloudinary from '@config/cloudinary';
import { CloudionaryRepository } from '../data/CloudinaryRepository';

@singleton()
export class FindAllImagesService {
  constructor(private storage: CloudionaryRepository) { }

  public async execute(inputDTO: FindAllImagesInputDTO): Promise<FindAllImagesOutputDTO> {
    const response = await this.storage.findAll(inputDTO);
    return response as unknown as FindAllImagesOutputDTO;
  }
}
