import { singleton } from 'tsyringe';
import { FindAllUserInputDTO } from "@modules/user/dto/FindAllUserInputDTO";
import { UserRepository } from "@modules/user/data/UserRepository";
import { FindAllUserOutputDTO } from "@modules/user/dto/FindAllUserOutputDTO";

@singleton()
export class FindAllUserService {
  constructor( private storage: UserRepository ) { }
  
  public async execute(inputDTO: FindAllUserInputDTO): Promise<FindAllUserOutputDTO> {
    const response = await this.storage.findAll(inputDTO);
    return response as unknown as FindAllUserOutputDTO;
  }
}
  