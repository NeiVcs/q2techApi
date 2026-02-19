import { MongoDbErrorException } from '@database/MongoDbErrorException';
import { IMusic } from './IMusic';
import { IMusicRepository } from './IMusicRepository';
import MusicSchema from './MusicModel';
import { CreateMusicInputDTO } from '@modules/music/dto/CreateMusicInputDTO';
import { UpdateMusicInputDTO } from '../dto/UpdateMusicInputDTO';

export class MusicRepository implements IMusicRepository {
  public async findAll(): Promise<IMusic[]> {
    try {
      return MusicSchema.find();
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findById(id: string): Promise<IMusic> {
    try {
      return MusicSchema.findById(id);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findByName(name: string): Promise<IMusic> {
    try {
      return MusicSchema.findOne({ name });
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async save(entity: CreateMusicInputDTO): Promise<IMusic> {
    try {
      return await MusicSchema.create(entity);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async update(entity: UpdateMusicInputDTO): Promise<IMusic> {
    try {
      return await MusicSchema.findByIdAndUpdate(entity.id, entity, { new: true });
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      await MusicSchema.deleteOne({ _id: id });
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }
}
