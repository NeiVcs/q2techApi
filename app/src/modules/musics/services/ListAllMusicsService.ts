import { singleton } from 'tsyringe';
import { ListAllMusicsInputDTO } from "@modules/musics/dto/ListAllMusicsInputDTO";
import { ListAllMusicsOutputDTO } from "@modules/musics/dto/ListAllMusicsOutputDTO";

@singleton()
export class ListAllMusicsService {
  constructor() {}
  
  public async execute(inputDTO: ListAllMusicsInputDTO): Promise<ListAllMusicsOutputDTO> {
    // TODO: implementar regra de negócio
    return {} as unknown as ListAllMusicsOutputDTO;
  }
  
}