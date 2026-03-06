import { singleton } from 'tsyringe';
import { CreateUserInputDTO } from "@modules/user/dto/CreateUserInputDTO";
import { UserRepository } from "@modules/user/data/UserRepository";
import { CreateUserOutputDTO } from "@modules/user/dto/CreateUserOutputDTO";

@singleton()
export class CreateUserService {
  constructor(private storage: UserRepository) { }

  public async execute(inputDTO: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const response = await this.storage.save(inputDTO);
    return response as unknown as CreateUserOutputDTO;
  }
}
