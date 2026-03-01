import { singleton } from 'tsyringe';
import { CreateMusicInputDTO } from '@modules/music/dto/CreateMusicInputDTO';
import { CreateMusicOutputDTO } from '@modules/music/dto/CreateMusicOutputDTO';
import { MusicRepository } from '@modules/music/data/MusicRepository';
import { CreateMusicTransformer } from '@modules/music/transformers/CreateMusicTransformer';

@singleton()
export class CreateMusicService {
  constructor(
    private transformer: CreateMusicTransformer,
    private storage: MusicRepository
  ) { }

  public async execute(inputDTO: CreateMusicInputDTO): Promise<CreateMusicOutputDTO> {
    const entities = await this.storage.save(inputDTO);
    return this.transformer.toApi(entities) as unknown as CreateMusicOutputDTO;
  }
}
