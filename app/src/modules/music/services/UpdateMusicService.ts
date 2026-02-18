import { singleton } from 'tsyringe';
import { UpdateMusicInputDTO } from "@modules/music/dto/UpdateMusicInputDTO";
import { UpdateMusicOutputDTO } from "@modules/music/dto/UpdateMusicOutputDTO";
import { CreateMusicTransformer } from '../transformers/CreateMusicTransformer';
import { MusicRepository } from '../data/MusicRepository';

@singleton()
export class UpdateMusicService {
  constructor(
    private transformer: CreateMusicTransformer,
    private storage: MusicRepository
  ) { }

  public async execute(inputDTO: UpdateMusicInputDTO): Promise<UpdateMusicOutputDTO> {
    const entities = await this.storage.update(inputDTO);
    return this.transformer.toApi(entities) as unknown as UpdateMusicOutputDTO;
  }
}
