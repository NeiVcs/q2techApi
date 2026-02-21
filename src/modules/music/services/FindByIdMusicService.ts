import { singleton } from 'tsyringe';
import { FindByIdMusicInputDTO } from '@modules/music/dto/FindByIdMusicInputDTO';
import { MusicRepository } from '@modules/music/data/MusicRepository';
import { MusicDTO } from '@modules/music/dto/MusicDTO';
import { FindByIdMusicTransformer } from '@modules/music/transformers/FindByIdMusicTransformer';
import { FindAllMusicOutputDTO } from '@modules/music/dto/FindByIdMusicOutputDTO';

@singleton()
export class FindByIdMusicService {
  constructor(
    private transformer: FindByIdMusicTransformer,
    private storage: MusicRepository
  ) { }

  public async execute(inputDTO: FindByIdMusicInputDTO): Promise<MusicDTO> {
    const entity = await this.storage.findById(inputDTO.id);

    return this.transformer.toApi(entity) as unknown as FindAllMusicOutputDTO;
  }
}
