import { singleton } from 'tsyringe';
  import {FastifyRequest} from 'fastify';
  import { DeleteImageParamsRequest } from '@modules/cloudinary/schemas/DeleteImageSchema'
  import { DeleteImageInputDTO } from "@modules/cloudinary/dto/DeleteImageInputDTO";
  
  

@singleton()
export class DeleteImageTransformer {
  public fromApi(request?: FastifyRequest<{ Params: DeleteImageParamsRequest }>): DeleteImageInputDTO {
    const { params } = request;

    return {
       id: params.id,
    };
  }

  
}
  