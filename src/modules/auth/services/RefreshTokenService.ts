import { singleton } from 'tsyringe';
import { RefreshTokenInputDTO } from "@modules/auth/dto/RefreshTokenInputDTO";
import { RefreshTokenOutputDTO } from "@modules/auth/dto/RefreshTokenOutputDTO";
import { UserRepository } from '@modules/user/data/UserRepository';
import { CompanyRepository } from '@modules/company/data/CompanyRepository';
import jwt from 'jsonwebtoken';
import { FindByEmailUserOutputDTO } from '@modules/user/dto/FindByEmailUserOutputDTO';
import { UnauthorizedException } from '@shared/exceptions';

@singleton()
export class RefreshTokenService {
  constructor(
    private storage: UserRepository,
    private companyStorage: CompanyRepository
  ) { }

  public async execute(inputDTO: RefreshTokenInputDTO): Promise<RefreshTokenOutputDTO> {
    try {
      const secret = process.env.JWT_SECRET;
      const decoded = jwt.verify(inputDTO.token, secret) as any;
      const response = await this.storage.findById(decoded.id);
      const token = await this.createToken(response)

      return token as unknown as RefreshTokenOutputDTO;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async createToken(inputDTO: FindByEmailUserOutputDTO): Promise<RefreshTokenOutputDTO> {
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

    return { token: token } as unknown as RefreshTokenOutputDTO;
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
