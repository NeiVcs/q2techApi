import { singleton } from 'tsyringe';
import { FindByIdAdditionalInputDTO } from "@modules/additional/dto/FindByIdAdditionalInputDTO";
import { AdditionalRepository } from "@modules/additional/data/AdditionalRepository";
import { FindByIdAdditionalOutputDTO } from "@modules/additional/dto/FindByIdAdditionalOutputDTO";

@singleton()
export class FindByIdAdditionalService {
  constructor(private storage: AdditionalRepository) { }

  public async execute(inputDTO: FindByIdAdditionalInputDTO): Promise<FindByIdAdditionalOutputDTO> {
    const response = await this.storage.findById(inputDTO.id);
    return response as unknown as FindByIdAdditionalOutputDTO;
  }
}
