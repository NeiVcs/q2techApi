import { MongoDbErrorException } from '@database/MongoDbErrorException';
import { IProduct } from './IProduct';
import { ProductModel } from './ProductModel';
import { CreateProductInputDTO } from '../dto/CreateProductInputDTO';
import { FindAllProductInputDTO } from '../dto/FindAllProductInputDTO';
import { FindAllProductOutputDTO } from '../dto/FindAllProductOutputDTO';

export class ProductRepository {
  public async findAll(dto: FindAllProductInputDTO): Promise<FindAllProductOutputDTO> {
    try {
      const query = Object.fromEntries(Object.entries(dto).filter(([key, value]) => value != null && value !== '' && key !== 'page' && key !== 'pageSize'));
      const skip = (dto.page - 1) * dto.pageSize;
      const data = await ProductModel.find(query).skip(skip).limit(dto.pageSize).lean();

      const items = data.map((el: IProduct) => ({ id: el._id.toString(), ...el }));
      const total = await ProductModel.countDocuments();

      return { items: items, pagination: { ...dto, total: total } }

    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findById(id: string): Promise<IProduct> {
    try {
      const result = await ProductModel.findById(id);
      if (!result) {
        throw { type: 'NOT_FOUND', message: 'Produto não encontrado' };
      }
      return result;
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async save(entity: CreateProductInputDTO): Promise<IProduct> {
    try {
      return await ProductModel.create(entity);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async update(entity: any): Promise<void> {
    try {
      const body = Object.fromEntries(Object.entries(entity).filter(([_, value]) => value != null && value !== ''));
      const result = await ProductModel.findByIdAndUpdate(entity.id, body, { new: true });
      if (!result) {
        throw { type: 'NOT_FOUND', message: 'Produto não encontrado' };
      }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const result = await ProductModel.findByIdAndDelete({ _id: id });
      if (!result) {
        throw { type: 'NOT_FOUND', message: 'Produto não encontrado' };
      }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }
}
