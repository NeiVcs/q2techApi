import { singleton } from 'tsyringe';
import { CreateTableStatusInputDTO } from "@modules/tableStatus/dto/CreateTableStatusInputDTO";
import { CreateTableStatusOutputDTO } from "@modules/tableStatus/dto/CreateTableStatusOutputDTO";
import { TableStatusRepository } from '../data/TableStatusRepository';

@singleton()
export class CreateTableStatusService {
  constructor(private storage: TableStatusRepository) { }

  public async execute(inputDTO: CreateTableStatusInputDTO): Promise<CreateTableStatusOutputDTO> {
    const response = await this.storage.save(inputDTO);
    return response as unknown as CreateTableStatusOutputDTO;
  }
}
