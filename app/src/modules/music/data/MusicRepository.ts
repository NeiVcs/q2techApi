import { MongoDbErrorException } from '@database/MongoDbErrorException';
import { IMusic } from './IMusic';
import { IMusicRepository } from './IMusicRepository';
import MusicSchema from './MusicModel';
import { CreateMusicInputDTO } from '@modules/music/dto/CreateMusicInputDTO';
import { CreateMusicOutputDTO } from '@modules/music/dto/CreateMusicOutputDTO';

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

  public async save(entity: CreateMusicInputDTO): Promise<CreateMusicOutputDTO> {
    try {
      return await MusicSchema.create(entity);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async update(entity: Partial<IMusic>): Promise<IMusic | null> {
    try {
      const updatedEntity = await entity.updateOne(entity);

      //const updatedEntity = await MusicSchema.findByIdAndUpdate(entity.id, entity, { new: true });

      return Promise.resolve(updatedEntity);
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
