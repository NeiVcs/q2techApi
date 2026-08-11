import { singleton } from 'tsyringe';
import { DeleteImageInputDTO } from "@modules/cloudinary/dto/DeleteImageInputDTO";
import { CloudionaryRepository } from '../data/CloudinaryRepository';

@singleton()
export class DeleteImageService {
  constructor(private storage: CloudionaryRepository) { }

  public async execute(inputDTO: DeleteImageInputDTO): Promise<void> {
    const response = await this.storage.delete(inputDTO.id);
    return;
  }
}
