import { singleton } from 'tsyringe';
import { DeleteUserInputDTO } from "@modules/user/dto/DeleteUserInputDTO";
import { UserRepository } from "@modules/user/data/UserRepository";
import { DeleteCompanyService } from '@modules/company/services/DeleteCompanyService';

@singleton()
export class DeleteUserService {
  constructor(
    private userStorage: UserRepository,
    private deleteCompany: DeleteCompanyService,
  ) { }

  public async execute(inputDTO: DeleteUserInputDTO): Promise<void> {
    const isAdmin = inputDTO.id && (inputDTO.id !== inputDTO.userId)
    const id = isAdmin ? inputDTO.id : inputDTO.userId

    const user = await this.userStorage.findById(id)

    await Promise.all(
      user.companyDataList.map((company) =>
        this.deleteCompany.execute({ id: company.companyId })
      )
    );

    await this.userStorage.delete(inputDTO.id);
    return;
  }
}
