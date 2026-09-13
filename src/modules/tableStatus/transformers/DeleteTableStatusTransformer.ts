import { singleton } from 'tsyringe';
  import {FastifyRequest} from 'fastify';
  import { DeleteTableStatusParamsRequest } from '@modules/tableStatus/schemas/DeleteTableStatusSchema'
  import { DeleteTableStatusInputDTO } from "@modules/tableStatus/dto/DeleteTableStatusInputDTO";
  
  

@singleton()
export class DeleteTableStatusTransformer {
  public fromApi(request?: FastifyRequest<{ Params: DeleteTableStatusParamsRequest }>): DeleteTableStatusInputDTO {
    const { params } = request;

    return {
       id: params.id,
    };
  }

  
}
  