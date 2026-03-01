import { singleton } from 'tsyringe';
import { FindByUrlCompanyInputDTO } from "@modules/company/dto/FindByUrlCompanyInputDTO";
import { FindByUrlCompanyOutputDTO } from "@modules/company/dto/FindByUrlCompanyOutputDTO";
import { CompanyRepository } from '../data/CompanyRepository';

@singleton()
export class FindByUrlCompanyService {
  constructor(private storage: CompanyRepository) { }

  public async execute(inputDTO: FindByUrlCompanyInputDTO): Promise<FindByUrlCompanyOutputDTO> {
    const response = await this.storage.findByUrl(inputDTO.url);
    return response as unknown as FindByUrlCompanyOutputDTO;
  }
}
