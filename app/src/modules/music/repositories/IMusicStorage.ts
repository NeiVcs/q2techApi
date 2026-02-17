import { MusicEntity } from './entities/MusicEntity';

export interface IMusicStorage {
  findByName(name: string): Promise<MusicEntity>;
}
