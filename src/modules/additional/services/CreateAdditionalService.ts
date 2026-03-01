import { singleton } from 'tsyringe';
import { CreateAdditionalInputDTO } from "@modules/additional/dto/CreateAdditionalInputDTO";
import { CreateAdditionalOutputDTO } from "@modules/additional/dto/CreateAdditionalOutputDTO";
import { AdditionalRepository } from '../data/AdditionalRepository';

@singleton()
export class CreateAdditionalService {
  constructor(private storage: AdditionalRepository) { }

  public async execute(inputDTO: CreateAdditionalInputDTO): Promise<CreateAdditionalOutputDTO> {
    const response = await this.storage.save(inputDTO);
    return response as unknown as CreateAdditionalOutputDTO;
  }
}
