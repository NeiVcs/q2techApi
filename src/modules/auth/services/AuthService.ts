import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { singleton } from 'tsyringe';
import { AuthInputDTO } from "@modules/auth/dto/AuthInputDTO";
import { UserRepository } from '@modules/user/data/UserRepository';
import { AuthOutputDTO } from "@modules/auth/dto/AuthOutputDTO";
import { FindByEmailUserOutputDTO } from '@modules/user/dto/FindByEmailUserOutputDTO';
import { AccessDeniedException } from '@shared/exceptions';
import { CompanyRepository } from '@modules/company/data/CompanyRepository';

@singleton()
export class AuthService {
  constructor(
    private storage: UserRepository,
    private companyStorage: CompanyRepository
  ) { }

  public async execute(inputDTO: AuthInputDTO): Promise<AuthOutputDTO> {
    const response = await this.storage.findByLogin(inputDTO.email);
    await this.passwordValidation(inputDTO, response)
    const token = await this.createToken(response)

    return token as unknown as AuthOutputDTO;
  }

  private async passwordValidation(inputDTO: AuthInputDTO, userData: FindByEmailUserOutputDTO): Promise<void> {
    const isMatch = await bcrypt.compare(inputDTO.password, userData.password);
    if (!isMatch) {
      throw new AccessDeniedException();
    }
  }

  private async createToken(inputDTO: FindByEmailUserOutputDTO): Promise<AuthOutputDTO> {
    const companyDataList = await this.getCompaniesData(inputDTO)

    const secret = process.env.JWT_SECRET;
    const token = jwt.sign(
      {
        id: inputDTO.id,
        name: inputDTO.name,
        companyDataList: companyDataList,
      },
      secret,
      { expiresIn: '8h' }
    );

    return { token: token } as unknown as AuthOutputDTO;
  }

  private async getCompaniesData(inputDTO: FindByEmailUserOutputDTO): Promise<any> {
    const companyDataList = await this.companyStorage.findAll({});
    const userCompanyIdsList = inputDTO.companyDataList.map((company) => company.companyId)
    const userCompanies = companyDataList.items.filter((company) => userCompanyIdsList.includes(company.id))

    const companyData = userCompanies.map((company) => {
      return {
        companyId: company.id,
        companyName: company?.name,
        companyUrl: company?.url
      }
    })

    return companyData
  }
}
