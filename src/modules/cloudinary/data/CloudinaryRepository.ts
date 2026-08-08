import { MongoDbErrorException } from '@database/MongoDbErrorException';
import cloudinary from '@config/cloudinary';

export class CloudionaryRepository {
  private static readonly notFoundResponse = 'Empresa nâo encontrada';

  public async findAll(dto: any): Promise<any> {
    try {
      const items = await cloudinary.search
        .expression('resource_type:image')
        .sort_by('created_at', 'desc')
        .max_results(dto.pageSize)
        .execute();
      console.log(items)
      return {
        limit: {
          total: items.rate_limit_allowed,
          remaining: items.rate_limit_remaining,
          reset: items.rate_limit_reset_at
        }, items: items.resources, pagination: { ...dto, total: items.total_count }
      }
    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findById(id: string): Promise<any> {
    try {

    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async save(entity: any): Promise<any> {
    try {

    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async update(entity: any): Promise<void> {
    try {

    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async delete(id: string): Promise<void> {
    try {

    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findByUrl(url: string): Promise<any> {
    try {

    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }

  public async findByUrlIfExist(url: string): Promise<any> {
    try {

    } catch (e) {
      throw new MongoDbErrorException(e);
    }
  }
}
