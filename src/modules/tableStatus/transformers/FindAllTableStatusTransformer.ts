import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindAllTableStatusResponse } from '@modules/tableStatus/schemas/FindAllTableStatusSchema'
import { FindAllTableStatusInputDTO } from "@modules/tableStatus/dto/FindAllTableStatusInputDTO";
import { FindAllTableStatusOutputDTO } from "@modules/tableStatus/dto/FindAllTableStatusOutputDTO";

@singleton()
export class FindAllTableStatusTransformer {
  public fromApi(request?: FastifyRequest): FindAllTableStatusInputDTO {
    // fallback vazio
    return {};
  }

  public toApi(outputDTO: FindAllTableStatusOutputDTO): FindAllTableStatusResponse {
    return {
      items: Array.isArray(outputDTO?.items) ? outputDTO.items.map(f => ({
        id: f?.id ?? '',
        companyId: f?.companyId ?? '',
        userId: f?.userId ?? '',
        status: f?.status ?? '',
      })) : [],
    };
  }
}
