import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindByIdAdditionalParamsRequest, FindByIdAdditionalResponse } from '@modules/additional/schemas/FindByIdAdditionalSchema'
import { FindByIdAdditionalInputDTO } from "@modules/additional/dto/FindByIdAdditionalInputDTO";
import { FindByIdAdditionalOutputDTO } from "@modules/additional/dto/FindByIdAdditionalOutputDTO";

@singleton()
export class FindByIdAdditionalTransformer {
  public fromApi(request?: FastifyRequest<{ Params: FindByIdAdditionalParamsRequest }>): FindByIdAdditionalInputDTO {
    const { params } = request;

    return {
      id: params.id,
    };
  }

  public toApi(outputDTO: FindByIdAdditionalOutputDTO): FindByIdAdditionalResponse {
    return {
      id: outputDTO?.id ?? '',
      name: outputDTO?.name ?? '',
      min: outputDTO?.min,
      max: outputDTO?.max,
      productIdList: Array.isArray(outputDTO?.productIdList) ? [...outputDTO.productIdList] : [],
    };
  }
}
