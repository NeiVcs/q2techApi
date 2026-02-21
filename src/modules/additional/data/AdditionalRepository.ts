import { MongoDbErrorException } from '@database/MongoDbErrorException';
import { IAdditional } from './IAdditional';
import { CreateAdditionalInputDTO } from '../dto/CreateAdditionalInputDTO';
import { AdditionalModel } from './AdditionalModel';

export class AdditionalRepository {
  public async findAll(dto: any): Promise<IAdditional[]> {
    try {
      const query = Object.fromEntries(Object.entries(dto).filter(([_, value]) => value != null && value !== ''));
      return await AdditionalModel.find(query);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findById(id: string): Promise<IAdditional> {
    try {
      const result = await AdditionalModel.findById(id);
      if (!result) {
        throw { type: 'NOT_FOUND', message: 'Música não encontrada' };
      }
      return result;
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findByName(name: string): Promise<IAdditional> {
    try {
      return AdditionalModel.findOne({ name });
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async save(entity: CreateAdditionalInputDTO): Promise<IAdditional> {
    try {
      return await AdditionalModel.create(entity);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async update(entity: any): Promise<void> {
    try {
      const body = Object.fromEntries(Object.entries(entity).filter(([_, value]) => value != null && value !== ''));
      const result = await AdditionalModel.findByIdAndUpdate(entity.id, body, { new: true });
      if (!result) {
        throw { type: 'NOT_FOUND', message: 'Música não encontrada' };
      }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const result = await AdditionalModel.findByIdAndDelete({ _id: id });
      if (!result) {
        throw { type: 'NOT_FOUND', message: 'Música não encontrada' };
      }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }
}
