import { singleton } from 'tsyringe';
import { DeleteAdditionalInputDTO } from "@modules/additional/dto/DeleteAdditionalInputDTO";
import { AdditionalRepository } from '../data/AdditionalRepository';

@singleton()
export class DeleteAdditionalService {
  constructor(private storage: AdditionalRepository) { }

  public async execute(inputDTO: DeleteAdditionalInputDTO): Promise<void> {
    await this.storage.delete(inputDTO.id);
  }
}
