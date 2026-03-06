import { singleton } from 'tsyringe';
import { DeleteUserInputDTO } from "@modules/user/dto/DeleteUserInputDTO";
import { UserRepository } from "@modules/user/data/UserRepository";

@singleton()
export class DeleteUserService {
  constructor(private storage: UserRepository) { }

  public async execute(inputDTO: DeleteUserInputDTO): Promise<void> {
    await this.storage.delete(inputDTO.id);
    return;
  }
}
