import { singleton } from 'tsyringe';
import { FindByIdUserInputDTO } from "@modules/user/dto/FindByIdUserInputDTO";
import { UserRepository } from "@modules/user/data/UserRepository";
import { FindByIdUserOutputDTO } from "@modules/user/dto/FindByIdUserOutputDTO";

@singleton()
export class FindByIdUserService {
  constructor( private storage: UserRepository ) { }
  
  public async execute(inputDTO: FindByIdUserInputDTO): Promise<FindByIdUserOutputDTO> {
    const response = await this.storage.findById(inputDTO.id);
    return response as unknown as FindByIdUserOutputDTO;
  }
}
  