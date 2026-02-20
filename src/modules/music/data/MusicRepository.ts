import { MongoDbErrorException } from '@database/MongoDbErrorException';
import { IMusic } from './IMusic';
import { MusicModel } from '@modules/music/data/MusicModel';
import { CreateMusicInputDTO } from '@modules/music/dto/CreateMusicInputDTO';
import { UpdateMusicInputDTO } from '../dto/UpdateMusicInputDTO';
import { FindAllMusicInputDTO } from '@modules/music/dto/FindAllMusicInputDTO';
import { ResourceNotFoundException } from '@shared/exceptions';

export class MusicRepository {
  public async findAll(dto: FindAllMusicInputDTO): Promise<IMusic[]> {
    try {
      const query = Object.fromEntries(Object.entries(dto).filter(([_, value]) => value != null && value !== ''));
      return await MusicModel.find(query);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findById(id: string): Promise<IMusic> {
    try {
      const result = await MusicModel.findById(id);
      if (!result) {
        throw 'NOT_FOUND';
      }

      return result;
    } catch (e) {
      if (e === 'NOT_FOUND') {
        throw new ResourceNotFoundException('Música não encontrada');
      }
      throw new MongoDbErrorException(e);
    }
  }

  public async findByName(name: string): Promise<IMusic> {
    try {
      return MusicModel.findOne({ name });
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async save(entity: CreateMusicInputDTO): Promise<IMusic> {
    try {
      return await MusicModel.create(entity);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async update(entity: UpdateMusicInputDTO): Promise<void> {
    try {
      const body = Object.fromEntries(Object.entries(entity).filter(([_, value]) => value != null && value !== ''));
      const result = await MusicModel.findByIdAndUpdate(entity.id, body, { new: true });
      if (!result) {
        throw 'NOT_FOUND';
      }
    } catch (e) {
      if (e === 'NOT_FOUND') {
        throw new ResourceNotFoundException('Música não encontrada');
      }
      throw new MongoDbErrorException(e);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const result = await MusicModel.findByIdAndDelete({ _id: id });
      if (!result) {
        throw 'NOT_FOUND';
      }
    } catch (e) {
      if (e === 'NOT_FOUND') {
        throw new ResourceNotFoundException('Música não encontrada');
      }
      throw new MongoDbErrorException(e);
    }
  }
}
