import { singleton } from 'tsyringe';
import { CreateAdditionalInputDTO } from "@modules/additional/dto/CreateAdditionalInputDTO";
import { AdditionalRepository } from "@modules/additional/data/AdditionalRepository";
import { CreateAdditionalOutputDTO } from "@modules/additional/dto/CreateAdditionalOutputDTO";

@singleton()
export class CreateAdditionalService {
  constructor(private storage: AdditionalRepository) { }

  public async execute(inputDTO: CreateAdditionalInputDTO): Promise<CreateAdditionalOutputDTO> {
    const response = await this.storage.save(inputDTO);
    return response as unknown as CreateAdditionalOutputDTO;
  }
}
