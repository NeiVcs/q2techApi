import { singleton } from 'tsyringe';
import { AccessDeniedException } from '@shared/exceptions';
import { passwordValidation } from '@shared/helpers/passwordValidation';
import { UserRepository } from '@modules/user/data/UserRepository';
import { DeleteCompanyService } from './DeleteCompanyService';
import { RequestUserDeletionInputDTO } from '../dto/RequestUserDeletionInputDTO';

@singleton()
export class RequestUserDeletionService {
  constructor(
    private userStorage: UserRepository,
    private deleteCompanyService: DeleteCompanyService
  ) { }

  public async execute(inputDTO: RequestUserDeletionInputDTO): Promise<void> {
    const user = await this.userStorage.findById(inputDTO.userId)

    if (!user.companyDataList.find(company => company.companyId === inputDTO.id)) {
      throw new AccessDeniedException();
    }

    await passwordValidation({ email: user.email, password: inputDTO.password })

    await this.deleteCompanyService.execute({ id: inputDTO.id })

    return;
  }
}
