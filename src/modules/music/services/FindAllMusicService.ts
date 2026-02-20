import { singleton } from 'tsyringe';
import { MusicRepository } from '../data/MusicRepository';
import { FindAllMusicTransformer } from '../transformers/FindAllMusicTransformer';
import { FindAllMusicInputDTO } from '../dto/FindAllMusicInputDTO';
import { FindAllMusicOutputDTO } from '../dto/FindAllMusicOutputDTO';

@singleton()
export class FindAllMusicService {
  constructor(
    private transformer: FindAllMusicTransformer,
    private storage: MusicRepository
  ) {}

  public async execute(dto?: FindAllMusicInputDTO): Promise<FindAllMusicOutputDTO> {
    const entities = await this.storage.findAll(dto);

    return this.transformer.toDto(entities);
  }
}
