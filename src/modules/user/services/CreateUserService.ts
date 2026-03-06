import bcrypt from 'bcryptjs';
import { singleton } from 'tsyringe';
import { CreateUserInputDTO } from "@modules/user/dto/CreateUserInputDTO";
import { CreateUserOutputDTO } from "@modules/user/dto/CreateUserOutputDTO";
import { UserRepository } from '../data/UserRepository';

@singleton()
export class CreateUserService {
  constructor(private storage: UserRepository) { }

  public async execute(inputDTO: CreateUserInputDTO): Promise<CreateUserOutputDTO> {
    const hash = await bcrypt.hash(inputDTO.password, 10);
    const response = await this.storage.save({ ...inputDTO, password: hash });

    return response as unknown as CreateUserOutputDTO;
  }
}
