import { singleton } from 'tsyringe';
  import {FastifyRequest} from 'fastify';
  import { CreateTableStatusBodyRequest, CreateTableStatusResponse } from '@modules/tableStatus/schemas/CreateTableStatusSchema'
  import { CreateTableStatusInputDTO } from "@modules/tableStatus/dto/CreateTableStatusInputDTO";
  import { CreateTableStatusOutputDTO } from "@modules/tableStatus/dto/CreateTableStatusOutputDTO";
  

@singleton()
export class CreateTableStatusTransformer {
  public fromApi(request?: FastifyRequest<{ Body: CreateTableStatusBodyRequest }>): CreateTableStatusInputDTO {
    const { body } = request;

    return {
       companyId: body?.companyId || '',
       userId: body?.userId || '',
       status: body?.status || '',
    };
  }

  public toApi(outputDTO: CreateTableStatusOutputDTO): CreateTableStatusResponse {
    return {
      id: outputDTO?.id ?? '',
    };
  }
}
  