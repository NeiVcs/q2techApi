import { singleton } from 'tsyringe';
import { FindByCompanyIdTableStatusInputDTO } from "@modules/tableStatus/dto/FindByCompanyIdTableStatusInputDTO";
import { TableStatusRepository } from "@modules/tableStatus/data/TableStatusRepository";
import { FindByCompanyIdTableStatusOutputDTO } from "@modules/tableStatus/dto/FindByCompanyIdTableStatusOutputDTO";

@singleton()
export class FindByCompanyIdTableStatusService {
  constructor( private storage: TableStatusRepository ) { }
  
  public async execute(inputDTO: FindByCompanyIdTableStatusInputDTO): Promise<FindByCompanyIdTableStatusOutputDTO> {
    const response = await this.storage.findByCompanyId(inputDTO);
    return response as unknown as FindByCompanyIdTableStatusOutputDTO;
  }
}
  