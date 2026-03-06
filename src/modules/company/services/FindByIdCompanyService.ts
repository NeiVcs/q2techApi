import { singleton } from 'tsyringe';
import { FindByIdCompanyInputDTO } from "@modules/company/dto/FindByIdCompanyInputDTO";
import { CompanyRepository } from "@modules/company/data/CompanyRepository";
import { FindByIdCompanyOutputDTO } from "@modules/company/dto/FindByIdCompanyOutputDTO";

@singleton()
export class FindByIdCompanyService {
  constructor( private storage: CompanyRepository ) { }
  
  public async execute(inputDTO: FindByIdCompanyInputDTO): Promise<FindByIdCompanyOutputDTO> {
    const response = await this.storage.findById(inputDTO.id);
    return response as unknown as FindByIdCompanyOutputDTO;
  }
}
  