import { singleton } from 'tsyringe';
import { CreateAdditionalInputDTO } from "@modules/additional/dto/CreateAdditionalInputDTO";
import { CreateAdditionalOutputDTO } from "@modules/additional/dto/CreateAdditionalOutputDTO";
import { CreateAdditionalTransformer } from '../transformers/CreateAdditionalTransformer';
import { AdditionalRepository } from '../data/AdditionalRepository';

@singleton()
export class CreateAdditionalService {
  constructor(
    private transformer: CreateAdditionalTransformer,
    private storage: AdditionalRepository
  ) { }

  public async execute(inputDTO: CreateAdditionalInputDTO): Promise<CreateAdditionalOutputDTO> {
    console.log(inputDTO, 'aqui')
    const entities = await this.storage.save(inputDTO);
    return this.transformer.toApi(entities) as unknown as CreateAdditionalOutputDTO;
  }
}
