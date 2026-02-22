import { singleton } from 'tsyringe';
import { UpdateAdditionalInputDTO } from "@modules/additional/dto/UpdateAdditionalInputDTO";
import { AdditionalRepository } from '../data/AdditionalRepository';

@singleton()
export class UpdateAdditionalService {
  constructor(private storage: AdditionalRepository) { }

  public async execute(inputDTO: UpdateAdditionalInputDTO): Promise<void> {
    await this.storage.update(inputDTO);
    return;
  }
}
