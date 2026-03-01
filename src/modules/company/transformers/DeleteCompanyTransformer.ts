import { singleton } from 'tsyringe';
  import {FastifyRequest} from 'fastify';
  import { DeleteCompanyParamsRequest } from '@modules/company/schemas/DeleteCompanySchema'
  import { DeleteCompanyInputDTO } from "@modules/company/dto/DeleteCompanyInputDTO";
  
  

@singleton()
export class DeleteCompanyTransformer {
  public fromApi(request?: FastifyRequest<{ Params: DeleteCompanyParamsRequest }>): DeleteCompanyInputDTO {
    const { params } = request;

    return {
       id: params.id,
    };
  }

  
}
  