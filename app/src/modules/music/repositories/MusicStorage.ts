import { MongoDbErrorException } from '@database/MongoDbErrorException';
import { MusicEntity } from './entities/MusicEntity';
import { IMusicStorage } from './IMusicStorage';
import MusicSchema from './Schemas/MusicSchema';

export class MusicStorage implements IMusicStorage {
  public async findAll(): Promise<MusicEntity[]> {
    try {
      return MusicSchema.find();
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findById(id: string): Promise<MusicEntity> {
    try {
      return MusicSchema.findById(id);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findByName(name: string): Promise<MusicEntity> {
    try {
      return MusicSchema.findOne({ name });
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  // public async save(entity: MusicEntity): Promise<MusicEntity> {
  //   try {
  //     await entity.save();
  //     return Promise.resolve(entity);
  //   } catch (e) {
  //   //  throw new MongoDbErrorException(e);
  //   }
  // }

  // public async update(entity: MusicEntity): Promise<MusicEntity> {
  //   try {
  //     await entity.updateOne(entity);
  //     return Promise.resolve(entity);
  //   } catch (e) {
  //   //  throw new MongoDbErrorException(e);
  //   }
  // }

  public async delete(id: string): Promise<void> {
    try {
      await MusicSchema.deleteOne({ _id: id });
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }
}
