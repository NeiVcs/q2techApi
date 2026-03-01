import { singleton } from 'tsyringe';
import { DeleteCompanyInputDTO } from "@modules/company/dto/DeleteCompanyInputDTO";
import { CompanyRepository } from "@modules/company/data/CompanyRepository";


@singleton()
export class DeleteCompanyService {
  constructor( private storage: CompanyRepository ) { }
  
  public async execute(inputDTO: DeleteCompanyInputDTO): Promise<void> {
    await this.storage.delete(inputDTO.id);
    return;
  }
}
  