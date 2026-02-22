import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { UpdateAdditionalBodyRequest, UpdateAdditionalParamsRequest } from '@modules/additional/schemas/UpdateAdditionalSchema'
import { UpdateAdditionalInputDTO } from "@modules/additional/dto/UpdateAdditionalInputDTO";
import { validateRequest } from '@shared/validateRequest';
import { minAndMaxRequestSchema } from '@shared/validateRequest/validations/minAndMaxRequestSchema';

@singleton()
export class UpdateAdditionalTransformer {
  public fromApi(request?: FastifyRequest<{ Body: UpdateAdditionalBodyRequest; Params: UpdateAdditionalParamsRequest }>): UpdateAdditionalInputDTO {
    const { params, body } = request;

    validateRequest(minAndMaxRequestSchema, {
      min: body.min,
      max: body.max,
      message: "A quantidade mínima não pode ser maior que a máxima."
    });

    return {
      id: params.id,
      name: body?.name || '',
      min: body?.min || 0,
      max: body?.max || 0,
      productIdList: Array.isArray(body?.productIdList) ? [...body.productIdList] : [],
    };
  }
}
