import { MongoDbErrorException } from '@database/MongoDbErrorException';
import { IAdditional } from './IAdditional';
import { CreateAdditionalInputDTO } from '../dto/CreateAdditionalInputDTO';
import { AdditionalModel } from './AdditionalModel';
import { FindAllAdditionalInputDTO } from '../dto/FindAllAdditionalInputDTO';
import { FindAllAdditionalOutputDTO } from '../dto/FindAllAdditionalOutputDTO';
import { FindByIdAdditionalOutputDTO } from '../dto/FindByIdAdditionalOutputDTO';

export class AdditionalRepository {
  public async findAll(inputDTO: FindAllAdditionalInputDTO): Promise<FindAllAdditionalOutputDTO> {
    try {
      const skip = (inputDTO.page - 1) * inputDTO.pageSize;
      const data = await AdditionalModel.find().skip(skip).limit(inputDTO.pageSize).lean();

      const items = data.map((el: IAdditional) => ({ id: el._id.toString(), ...el }));
      const total = await AdditionalModel.countDocuments();

      return { items: items, pagination: { ...inputDTO, total: total } }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findById(id: string): Promise<FindByIdAdditionalOutputDTO> {
    try {
      const result = await AdditionalModel.findById(id).lean();
      if (!result) {
        throw { type: 'NOT_FOUND', message: 'Adicional não encontrado' };
      }
      return { id: result._id.toString(), ...result };
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
        throw { type: 'NOT_FOUND', message: 'Adicional não encontrado' };
      }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const result = await AdditionalModel.findByIdAndDelete({ _id: id });
      if (!result) {
        throw { type: 'NOT_FOUND', message: 'Adicional não encontrado' };
      }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }
}
