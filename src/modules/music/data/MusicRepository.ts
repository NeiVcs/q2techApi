import { MongoDbErrorException } from '@database/MongoDbErrorException';
import { IMusic } from './IMusic';
import { IMusicRepository } from './IMusicRepository';
import { MusicModel } from '@modules/music/data/MusicModel';
import { CreateMusicInputDTO } from '@modules/music/dto/CreateMusicInputDTO';
import { UpdateMusicInputDTO } from '../dto/UpdateMusicInputDTO';
import { FindAllMusicInputDTO } from '@modules/music/dto/FindAllMusicInputDTO';

export class MusicRepository implements IMusicRepository {
  public async findAll(dto: FindAllMusicInputDTO): Promise<IMusic[]> {
    try {
      const query = Object.fromEntries(Object.entries(dto).filter(([_, value]) => value != null && value !== ''));
      return MusicModel.find(query);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findById(id: string): Promise<IMusic> {
    try {
      return MusicModel.findById(id);
    } catch (e) {
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

  public async update(entity: UpdateMusicInputDTO): Promise<IMusic> {
    try {
      const body = Object.fromEntries(Object.entries(entity).filter(([_, value]) => value != null && value !== ''));
      return await MusicModel.findByIdAndUpdate(entity.id, body, { new: true });
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await MusicModel.deleteOne({ _id: id });
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }
}
