import { IMusic } from "./IMusic";


export interface IMusicStorage {
  findByName(name: string): Promise<IMusic>;
}
