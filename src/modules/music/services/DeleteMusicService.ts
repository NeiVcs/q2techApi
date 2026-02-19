import { singleton } from 'tsyringe';
import { DeleteMusicInputDTO } from "@modules/music/dto/DeleteMusicInputDTO";
import { MusicRepository } from '../data/MusicRepository';

@singleton()
export class DeleteMusicService {
  constructor(
    private storage: MusicRepository
  ) { }

  public async execute(inputDTO: DeleteMusicInputDTO): Promise<void> {
    await this.storage.delete(inputDTO.id);
  }
}
