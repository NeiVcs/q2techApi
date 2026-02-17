import { singleton } from 'tsyringe';
import { MusicStorage } from '../repositories/MusicStorage';
import { FindAllMusicTransformer } from '../transformers/FindAllMusicTransformer';
import { FindAllMusicInputDTO } from '../dto/FindAllMusicInputDTO';
import { FindAllMusicOutputDTO } from '../dto/FindAllMusicOutputDTO';

@singleton()
export class FindAllMusicService {
  constructor(private transformer: FindAllMusicTransformer, private storage: MusicStorage) { }

  public async execute(dto?: FindAllMusicInputDTO): Promise<FindAllMusicOutputDTO> {
    const entities = await this.storage.findAll();

    return this.transformer.toDto(entities);
  }
}
