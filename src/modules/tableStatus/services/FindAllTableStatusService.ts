import { singleton } from 'tsyringe';
import { FindAllTableStatusInputDTO } from "@modules/tableStatus/dto/FindAllTableStatusInputDTO";
import { TableStatusRepository } from "@modules/tableStatus/data/TableStatusRepository";
import { FindAllTableStatusOutputDTO } from "@modules/tableStatus/dto/FindAllTableStatusOutputDTO";

@singleton()
export class FindAllTableStatusService {
  constructor( private storage: TableStatusRepository ) { }
  
  public async execute(inputDTO: FindAllTableStatusInputDTO): Promise<FindAllTableStatusOutputDTO> {
    const response = await this.storage.findAll(inputDTO);
    return response as unknown as FindAllTableStatusOutputDTO;
  }
}
  