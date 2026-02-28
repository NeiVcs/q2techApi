import { singleton } from 'tsyringe';
import { UpdateCompanyInputDTO } from "@modules/company/dto/UpdateCompanyInputDTO";
import { CompanyRepository } from '../data/CompanyRepository';

@singleton()
export class UpdateCompanyService {
  constructor(private storage: CompanyRepository) { }

  public async execute(inputDTO: UpdateCompanyInputDTO): Promise<void> {
    const response = await this.storage.update(inputDTO);
    return;
  }
}
