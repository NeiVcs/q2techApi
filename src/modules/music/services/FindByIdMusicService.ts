import { singleton } from 'tsyringe';
import { FindByIdMusicInputDTO } from '@modules/music/dto/FindByIdMusicInputDTO';
import { MusicRepository } from '@modules/music/data/MusicRepository';
import { MusicDTO } from '@modules/music/dto/MusicDTO';
import { FindAllMusicOutputDTO } from '@modules/music/dto/FindByIdMusicOutputDTO';

@singleton()
export class FindByIdMusicService {
  constructor(private storage: MusicRepository) { }

  public async execute(inputDTO: FindByIdMusicInputDTO): Promise<MusicDTO> {
    const response = await this.storage.findById(inputDTO.id);
    return response as unknown as FindAllMusicOutputDTO;
  }
}
