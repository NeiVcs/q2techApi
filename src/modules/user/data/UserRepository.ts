import { MongoDbErrorException } from '@database/MongoDbErrorException';
import { IUser } from './IUser';
import { UserModel } from './UserModel';
import { ensureExists } from '@shared/helpers/ensureExists';
import { CreateUserInputDTO } from '../dto/CreateUserInputDTO';
import { FindAllUserInputDTO } from '../dto/FindAllUserInputDTO';
import { FindByIdUserOutputDTO } from '@modules/user/dto/FindByIdUserOutputDTO';
import { FindAllUserOutputDTO } from '@modules/user/dto/FindAllUserOutputDTO';
import { UpdateUserInputDTO } from '../dto/UpdateUserInputDTO';
import { AccessDeniedException } from '@shared/exceptions';
import { FindByEmailUserOutputDTO } from '../dto/FindByEmailUserrOutputDTO';

export class UserRepository {
  private static readonly notFoundResponse = 'Usuário nâo encontrado';

  public async findAll(dto: FindAllUserInputDTO): Promise<FindAllUserOutputDTO> {
    try {
      const query = Object.fromEntries(Object.entries(dto).filter(([key, value]) => value != null && value !== '' && key !== 'page' && key !== 'pageSize'));
      const skip = (dto.page - 1) * dto.pageSize;
      const data = await UserModel.find(query).skip(skip).limit(dto.pageSize).lean();

      const items = data.map((el: IUser) => ({ id: el._id.toString(), ...el }));
      const total = await UserModel.countDocuments();

      return { items: items, pagination: { ...dto, total: total } }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findById(id: string): Promise<FindByIdUserOutputDTO> {
    try {
      const result = await UserModel.findById(id).lean();
      ensureExists(result, UserRepository.notFoundResponse)
      return { id: result._id.toString(), ...result };
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async save(entity: CreateUserInputDTO): Promise<IUser> {
    try {
      return await UserModel.create(entity);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async update(entity: UpdateUserInputDTO): Promise<void> {
    try {
      const body = Object.fromEntries(Object.entries(entity).filter(([_, value]) => value != null && value !== ''));
      const result = await UserModel.findByIdAndUpdate(entity.id, body, { new: true });
      ensureExists(result, UserRepository.notFoundResponse)
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const result = await UserModel.findByIdAndDelete({ _id: id });
      ensureExists(result, UserRepository.notFoundResponse)
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findByLogin(email: string): Promise<FindByEmailUserOutputDTO> {
    try {
      const result = await UserModel.findOne({ email }).lean();
      if (!result) {
        throw new AccessDeniedException();
      }

      return { id: result._id.toString(), ...result };
    } catch (e) {
      if (e instanceof AccessDeniedException) {
        throw e;
      }
      throw new MongoDbErrorException(e);
    }
  }
}
