import { MongoDbErrorException } from '@database/MongoDbErrorException';
import { ICompany } from './ICompany';
import { CompanyModel } from './CompanyModel';
import { CreateCompanyInputDTO } from '../dto/CreateCompanyInputDTO';
import { FindByIdCompanyOutputDTO } from '../dto/FindByIdCompanyOutputDTO';
import { UpdateCompanyInputDTO } from '../dto/UpdateCompanyInputDTO';
import { ensureExists } from '@shared/helpers/ensureExists';

export class CompanyRepository {
  private static readonly notFoundResponse = 'Empresa nâo encontrada';

  public async findAll(dto: any): Promise<any> {
    try {
      const query = Object.fromEntries(Object.entries(dto).filter(([key, value]) => value != null && value !== '' && key !== 'page' && key !== 'pageSize'));
      const skip = (dto.page - 1) * dto.pageSize;
      const data = await CompanyModel.find(query).skip(skip).limit(dto.pageSize).lean();

      const items = data.map((el: ICompany) => ({ id: el._id.toString(), ...el }));
      const total = await CompanyModel.countDocuments();

      return { items: items, pagination: { ...dto, total: total } }

    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findById(id: string): Promise<FindByIdCompanyOutputDTO> {
    try {
      const result = await CompanyModel.findById(id).lean();
      ensureExists(result, CompanyRepository.notFoundResponse)
      return { id: result._id.toString(), ...result };
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async save(entity: CreateCompanyInputDTO): Promise<ICompany> {
    try {
      return await CompanyModel.create(entity);
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async update(entity: UpdateCompanyInputDTO): Promise<void> {
    try {
      const body = Object.fromEntries(Object.entries(entity).filter(([_, value]) => value != null && value !== ''));
      const result = await CompanyModel.findByIdAndUpdate(entity.id, body, { new: true });
      ensureExists(result, CompanyRepository.notFoundResponse)
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async delete(id: string): Promise<void> {
    try {
      const result = await CompanyModel.findByIdAndDelete({ _id: id });
      ensureExists(result, CompanyRepository.notFoundResponse)
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }
}
