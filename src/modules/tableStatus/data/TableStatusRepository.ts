import { MongoDbErrorException } from '@database/MongoDbErrorException';
import { TableStatusModel } from './TableStatusModel';
import { ITableStatus } from './ITableStatus';
import { CreateTableStatusInputDTO } from '../dto/CreateTableStatusInputDTO';
import { FindAllTableStatusInputDTO } from '../dto/FindAllTableStatusInputDTO';
import { FindAllTableStatusOutputDTO } from '../dto/FindAllTableStatusOutputDTO';
import { FindByCompanyIdTableStatusOutputDTO } from '../dto/FindByCompanyIdTableStatusOutputDTO';

export class TableStatusRepository {
  public async findAll(inputDTO: FindAllTableStatusInputDTO): Promise<FindAllTableStatusOutputDTO> {
    try {
      const data = await TableStatusModel.find().lean();

      const items = data.map((el: ITableStatus) => ({ id: el._id.toString(), ...el }));

      return { items: items }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async save(entity: CreateTableStatusInputDTO): Promise<ITableStatus> {
    try {
      return await TableStatusModel.create(entity);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const result = await TableStatusModel.findByIdAndDelete({ _id: id });
      if (!result) {
        throw { type: 'NOT_FOUND', message: 'Mesa não encontrada' };
      }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findByCompanyId(dto: any): Promise<any> {
    try {
      const query = Object.fromEntries(Object.entries(dto).filter(([key, value]) => value != null && value !== '' && key !== 'page' && key !== 'pageSize'));
      const data = await TableStatusModel.find(query).lean();

      const items = data.map((el: ITableStatus) => ({ id: el._id.toString(), ...el }));

      return { items: items }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }
}
