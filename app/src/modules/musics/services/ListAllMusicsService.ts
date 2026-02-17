import { singleton } from 'tsyringe';
import { MusicStorage } from '../repositories/MusicStorage';
import { ListAllMusicsTransformer } from '../transformers/ListAllMusicsTransformer';
import { ListAllMusicsInputDTO } from '../dto/ListAllMusicsInputDTO';
import { ListAllMusicsOutputDTO } from '../dto/ListAllMusicsOutputDTO';

@singleton()
export class ListAllMusicsService {
  constructor(private transformer: ListAllMusicsTransformer, private storage: MusicStorage) { }

  public async execute(dto?: ListAllMusicsInputDTO): Promise<ListAllMusicsOutputDTO> {
    const entities = await this.storage.findAll();

    return this.transformer.toDto({ items: entities });
  }
}
