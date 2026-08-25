import { singleton } from 'tsyringe';
import { DeleteUserInputDTO } from "@modules/user/dto/DeleteUserInputDTO";
import { UserRepository } from "@modules/user/data/UserRepository";
import { DeleteCompanyService } from '@modules/company/services/DeleteCompanyService';
import { passwordValidation } from '@shared/helpers/passwordValidation';

@singleton()
export class DeleteUserService {
  constructor(
    private userStorage: UserRepository,
    private deleteCompany: DeleteCompanyService,
  ) { }

  public async execute(inputDTO: DeleteUserInputDTO): Promise<void> {
    const user = await this.userStorage.findById(inputDTO.id)

    //await passwordValidation({ email: 'a', password: 'b' })

    await this.deleteCompany.execute({ id: user.companyDataList[0].companyId })

    await this.userStorage.delete(inputDTO.id);
    return;
  }
}
