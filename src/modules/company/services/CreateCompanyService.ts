import { singleton } from 'tsyringe';
import { CreateCompanyInputDTO } from "@modules/company/dto/CreateCompanyInputDTO";
import { CompanyRepository } from "@modules/company/data/CompanyRepository";
import { CreateCompanyOutputDTO } from "@modules/company/dto/CreateCompanyOutputDTO";

@singleton()
export class CreateCompanyService {
  constructor(private storage: CompanyRepository) { }

  public async execute(inputDTO: CreateCompanyInputDTO): Promise<CreateCompanyOutputDTO> {
    const response = await this.storage.save(inputDTO);
    return response as unknown as CreateCompanyOutputDTO;
  }
}
