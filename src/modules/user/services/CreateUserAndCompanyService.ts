import { singleton } from 'tsyringe';
import bcrypt from 'bcryptjs';
import { CreateUserAndCompanyInputDTO } from "@modules/user/dto/CreateUserAndCompanyInputDTO";
import { UserRepository } from "@modules/user/data/UserRepository";
import { CreateUserAndCompanyOutputDTO } from "@modules/user/dto/CreateUserAndCompanyOutputDTO";
import { CompanyRepository } from '@modules/company/data/CompanyRepository';
import { AuthService } from '@modules/auth/services/AuthService';
import { CodeErrors, ConflictAlreadyExistsException } from '@shared/exceptions';

@singleton()
export class CreateUserAndCompanyService {
  constructor(
    private userStorage: UserRepository,
    private companyStorage: CompanyRepository,
    private authService: AuthService
  ) { }

  public async execute(inputDTO: CreateUserAndCompanyInputDTO): Promise<CreateUserAndCompanyOutputDTO> {
    await this.validateData(inputDTO)

    const company = await this.companyStorage.save(inputDTO.company);

    const hash = await bcrypt.hash(inputDTO.user.password, 10);

    const companyDataList = [{ ...inputDTO.user.companyDataList[0], companyId: company.id }]

    await this.userStorage.save({ ...inputDTO.user, password: hash, companyDataList: companyDataList });

    return await this.authService.execute({ email: inputDTO.user.email, password: inputDTO.user.password })
  }

  private async validateData(inputDTO: CreateUserAndCompanyInputDTO): Promise<void> {
    const userExist = await this.userStorage.findByUserExist(inputDTO.user.taxId, inputDTO.user.email)
    if (userExist) {
      throw new ConflictAlreadyExistsException(CodeErrors.CODE_ERROR_USER_ALREADY_EXISTS)
    }

    const urlExist = await this.companyStorage.findByUrlIfExist(inputDTO.company.url)
    if (urlExist) {
      throw new ConflictAlreadyExistsException(CodeErrors.CODE_ERROR_COMPANY_ALREADY_EXISTS)
    }
  }
}
