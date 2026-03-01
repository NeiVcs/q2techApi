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
  ) { }

  public async execute(inputDTO?: FindAllMusicInputDTO): Promise<FindAllMusicOutputDTO> {
    const response = await this.storage.findAll(inputDTO);
    return { items: response } as unknown as FindAllMusicOutputDTO;
  }
}
