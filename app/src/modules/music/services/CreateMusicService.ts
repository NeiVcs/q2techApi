import { singleton } from 'tsyringe';
import { CreateMusicInputDTO } from "@modules/music/dto/CreateMusicInputDTO";
import { CreateMusicOutputDTO } from "@modules/music/dto/CreateMusicOutputDTO";

@singleton()
export class CreateMusicService {
  constructor() {}
  
  public async execute(inputDTO: CreateMusicInputDTO): Promise<CreateMusicOutputDTO> {
    // TODO: implementar regra de negócio
    return {} as unknown as CreateMusicOutputDTO;
  }
  
}