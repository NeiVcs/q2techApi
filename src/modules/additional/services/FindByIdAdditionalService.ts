import { singleton } from 'tsyringe';
import { FindByIdAdditionalInputDTO } from "@modules/additional/dto/FindByIdAdditionalInputDTO";
import { FindByIdAdditionalOutputDTO } from "@modules/additional/dto/FindByIdAdditionalOutputDTO";
import { AdditionalRepository } from '../data/AdditionalRepository';

@singleton()
export class FindByIdAdditionalService {
  constructor(private storage: AdditionalRepository) { }

  public async execute(inputDTO: FindByIdAdditionalInputDTO): Promise<FindByIdAdditionalOutputDTO> {
    const response = await this.storage.findById(inputDTO.id);
    return response as unknown as FindByIdAdditionalOutputDTO;
  }
}
