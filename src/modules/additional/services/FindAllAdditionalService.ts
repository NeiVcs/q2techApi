import { singleton } from 'tsyringe';
import { FindAllAdditionalInputDTO } from "@modules/additional/dto/FindAllAdditionalInputDTO";
import { AdditionalRepository } from "@modules/additional/data/AdditionalRepository";
import { FindAllAdditionalOutputDTO } from "@modules/additional/dto/FindAllAdditionalOutputDTO";

@singleton()
export class FindAllAdditionalService {
  constructor(private storage: AdditionalRepository) { }

  public async execute(inputDTO: FindAllAdditionalInputDTO): Promise<FindAllAdditionalOutputDTO> {
    const response = await this.storage.findAll(inputDTO);
    return response as unknown as FindAllAdditionalOutputDTO;
  }
}
