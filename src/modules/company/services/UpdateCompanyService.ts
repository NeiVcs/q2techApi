import { singleton } from 'tsyringe';
import { UpdateCompanyInputDTO } from "@modules/company/dto/UpdateCompanyInputDTO";
import { CompanyRepository } from "@modules/company/data/CompanyRepository";


@singleton()
export class UpdateCompanyService {
  constructor( private storage: CompanyRepository ) { }
  
  public async execute(inputDTO: UpdateCompanyInputDTO): Promise<void> {
    await this.storage.update(inputDTO);
    return;
  }
}
  