import { singleton } from 'tsyringe';
import { FindAllAdditionalOutputDTO } from "@modules/additional/dto/FindAllAdditionalOutputDTO";
import { AdditionalRepository } from '../data/AdditionalRepository';

@singleton()
export class FindAllAdditionalService {
  constructor(private storage: AdditionalRepository) { }

  public async execute(): Promise<FindAllAdditionalOutputDTO> {
    const response = await this.storage.findAll();
    return { items: response } as unknown as FindAllAdditionalOutputDTO;
  }
}
