import { singleton } from 'tsyringe';
import { UpdateMusicInputDTO } from "@modules/music/dto/UpdateMusicInputDTO";
import { MusicRepository } from '../data/MusicRepository';

@singleton()
export class UpdateMusicService {
  constructor(
    private storage: MusicRepository
  ) { }

  public async execute(inputDTO: UpdateMusicInputDTO): Promise<void> {
    await this.storage.update(inputDTO);
  }
}
