import { singleton } from 'tsyringe';
import { FindAllAdditionalOutputDTO } from "@modules/additional/dto/FindAllAdditionalOutputDTO";
import { AdditionalRepository } from '../data/AdditionalRepository';
import { FindAllAdditionalInputDTO } from '../dto/FindAllAdditionalInputDTO';

@singleton()
export class FindAllAdditionalService {
  constructor(private storage: AdditionalRepository) { }

  public async execute(inputDTO: FindAllAdditionalInputDTO): Promise<FindAllAdditionalOutputDTO> {
    return await this.storage.findAll(inputDTO) as unknown as FindAllAdditionalOutputDTO;
  }
}
