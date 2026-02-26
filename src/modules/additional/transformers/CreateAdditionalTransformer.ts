import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { CreateAdditionalBodyRequest, CreateAdditionalResponse } from '@modules/additional/schemas/CreateAdditionalSchema'
import { CreateAdditionalInputDTO } from "@modules/additional/dto/CreateAdditionalInputDTO";
import { CreateAdditionalOutputDTO } from "@modules/additional/dto/CreateAdditionalOutputDTO";
import { minAndMaxRequestSchema } from '@shared/validateRequest/validations/minAndMaxRequestSchema';
import { validateRequest } from '@shared/validateRequest';

@singleton()
export class CreateAdditionalTransformer {
  public fromApi(request?: FastifyRequest<{ Body: CreateAdditionalBodyRequest }>): CreateAdditionalInputDTO {
    if (!request) {
      throw new Error("Request is required");
    }
    const { body } = request;

    validateRequest(minAndMaxRequestSchema, {
      min: body.min,
      max: body.max,
      message: "A quantidade mínima não pode ser maior que a máxima."
    });

    return {
      companyId: body?.companyId || '',
      category: body?.category || '',
      name: body?.name || '',
      min: body?.min || 0,
      max: body?.max || 0,
      productIdList: Array.isArray(body?.productIdList) ? [...body.productIdList] : [],
    };
  }

  public toApi(outputDTO: CreateAdditionalOutputDTO): CreateAdditionalResponse {
    return {
      id: outputDTO?.id ?? '',
    };
  }
}
