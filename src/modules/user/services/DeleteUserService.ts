import { singleton } from 'tsyringe';
import { DeleteUserInputDTO } from "@modules/user/dto/DeleteUserInputDTO";
import { UserRepository } from "@modules/user/data/UserRepository";
import { DeleteCompanyService } from '@modules/company/services/DeleteCompanyService';
import { AccessDeniedException } from '@shared/exceptions';

@singleton()
export class DeleteUserService {
  constructor(
    private userStorage: UserRepository,
    private deleteCompany: DeleteCompanyService,
  ) { }

  public async execute(inputDTO: DeleteUserInputDTO): Promise<void> {
    let isAdmin = inputDTO.userId === process.env.ADMIN_ID

    if (!isAdmin && inputDTO.id !== inputDTO.userId) {
      throw new AccessDeniedException();
    }

    const user = await this.userStorage.findById(inputDTO.id)

    await Promise.all(
      user.companyDataList.map((company) =>
        this.deleteCompany.execute({ id: company.companyId })
      )
    );

    await this.userStorage.delete(inputDTO.id);
  }
}
