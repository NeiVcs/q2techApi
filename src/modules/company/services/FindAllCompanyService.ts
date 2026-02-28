import { singleton } from 'tsyringe';
import { FindAllCompanyInputDTO } from "@modules/company/dto/FindAllCompanyInputDTO";
import { CompanyRepository } from "@modules/company/data/CompanyRepository";
import { FindAllCompanyOutputDTO } from "@modules/company/dto/FindAllCompanyOutputDTO";

@singleton()
export class FindAllCompanyService {
  constructor(private storage: CompanyRepository) { }

  public async execute(inputDTO: FindAllCompanyInputDTO): Promise<FindAllCompanyOutputDTO> {
    const response = await this.storage.findAll(inputDTO);

    return response as unknown as FindAllCompanyOutputDTO;
  }
}
