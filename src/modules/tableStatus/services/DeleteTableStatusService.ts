import { singleton } from 'tsyringe';
import { DeleteTableStatusInputDTO } from "@modules/tableStatus/dto/DeleteTableStatusInputDTO";
import { TableStatusRepository } from "@modules/tableStatus/data/TableStatusRepository";


@singleton()
export class DeleteTableStatusService {
  constructor( private storage: TableStatusRepository ) { }
  
  public async execute(inputDTO: DeleteTableStatusInputDTO): Promise<void> {
    await this.storage.delete(inputDTO.id);
    return;
  }
}
  