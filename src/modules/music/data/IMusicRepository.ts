import { IMusic } from './IMusic';

export interface IMusicRepository {
  findByName(name: string): Promise<IMusic>;
}
