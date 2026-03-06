import { singleton } from 'tsyringe';
import { UpdateUserInputDTO } from "@modules/user/dto/UpdateUserInputDTO";
import { UserRepository } from "@modules/user/data/UserRepository";


@singleton()
export class UpdateUserService {
  constructor( private storage: UserRepository ) { }
  
  public async execute(inputDTO: UpdateUserInputDTO): Promise<void> {
    await this.storage.update(inputDTO);
    return;
  }
}
  