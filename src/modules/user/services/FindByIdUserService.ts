import { singleton } from 'tsyringe';
import { FindByIdUserInputDTO } from "@modules/user/dto/FindByIdUserInputDTO";
import { UserRepository } from "@modules/user/data/UserRepository";
import { FindByIdUserOutputDTO } from "@modules/user/dto/FindByIdUserOutputDTO";
import { CompanyRepository } from '@modules/company/data/CompanyRepository';

@singleton()
export class FindByIdUserService {
  constructor(
    private userStorage: UserRepository,
    private companyStorage: CompanyRepository
  ) { }

  public async execute(inputDTO: FindByIdUserInputDTO): Promise<FindByIdUserOutputDTO> {
    const user = await this.userStorage.findById(inputDTO.id);
    const response = await this.populateCompany(user)

    return response as unknown as FindByIdUserOutputDTO;
  }

  private async populateCompany(user: FindByIdUserOutputDTO) {
    const companyDataList = await this.companyStorage.findAll({});
    const userCompanyIdsList = user.companyDataList.map((company) => company.companyId)

    const userCompanies = companyDataList.items.filter((company) => userCompanyIdsList.includes(company.id))

    const companyData = user.companyDataList.map((company) => {
      const companyData = userCompanies.find((data) => data.id === company.companyId)

      return {
        ...company,
        companyName: companyData?.name,
        companyUrl: companyData?.url,
        primaryColor: companyData?.stylization?.primaryColor,
        secondaryColor: companyData?.stylization?.secondaryColor
      }
    })
    return { ...user, companyDataList: companyData }
  }
}
