import { MongoDbErrorException } from '@database/MongoDbErrorException';
import { IOrder } from './IOrder';
import { OrderModel } from './OrderModel';
import { ensureExists } from '@shared/helpers/ensureExists';

export class OrderRepository {
  private static readonly notFoundResponse = 'Pedido nâo encontrado';

  public async findAll(dto: any): Promise<any> {
    try {
      const query = Object.fromEntries(Object.entries(dto).filter(([key, value]) => value != null && value !== '' && key !== 'page' && key !== 'pageSize'));
      const skip = (dto.page - 1) * dto.pageSize;
      const data = await OrderModel.find(query).skip(skip).limit(dto.pageSize).lean();

      const items = data.map((el: IOrder) => ({ id: el._id.toString(), ...el }));
      const total = await OrderModel.countDocuments();

      return { items: items, pagination: { ...dto, total: total } }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findById(id: string): Promise<any> {
    try {
      const result = await OrderModel.findById(id).lean();

      ensureExists(result, OrderRepository.notFoundResponse)

      return { id: result._id.toString(), ...result };
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async save(entity: any): Promise<IOrder> {
    try {
      return await OrderModel.create(entity);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async update(entity: any): Promise<void> {
    try {
      const body = Object.fromEntries(Object.entries(entity).filter(([_, value]) => value != null && value !== ''));
      const result = await OrderModel.findByIdAndUpdate(entity.id, body, { new: true });

      ensureExists(result, OrderRepository.notFoundResponse)
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const result = await OrderModel.findByIdAndDelete({ _id: id });

      ensureExists(result, OrderRepository.notFoundResponse)
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findByCompanyId(dto: any): Promise<any> {
    try {
      const query = Object.fromEntries(Object.entries(dto).filter(([key, value]) => value != null && value !== '' && key !== 'page' && key !== 'pageSize' && key !== 'userPhoneNumber'));
      if (dto.userPhoneNumber) {
        query['userData.phoneNumber'] = dto.userPhoneNumber;
      }

      const skip = (dto.page - 1) * dto.pageSize;
      const data = await OrderModel.find(query).skip(skip).limit(dto.pageSize).lean();

      const items = data.map((el: IOrder) => ({ id: el._id.toString(), ...el }));
      const total = await OrderModel.countDocuments();

      return { items: items, pagination: { ...dto, total: total } }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findByUserId(dto: any): Promise<any> {
    try {
      const query = Object.fromEntries(Object.entries(dto).filter(([key, value]) => value != null && value !== '' && key !== 'page' && key !== 'pageSize' && key !== 'userId'));
      if (dto.userId) {
        query['userData.userId'] = dto.userId;
      }

      const skip = (dto.page - 1) * dto.pageSize;
      const data = await OrderModel.find(query).skip(skip).limit(dto.pageSize).lean();

      const items = data.map((el: IOrder) => ({ id: el._id.toString(), ...el }));
      const total = await OrderModel.countDocuments();

      return { items: items, pagination: { ...dto, total: total } }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }
}
