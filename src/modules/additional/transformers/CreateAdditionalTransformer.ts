import { singleton } from 'tsyringe';
import { z } from 'zod/v4';
import { FastifyRequest } from 'fastify';
import { validateRequest } from '@shared/validateRequest';
import { CreateAdditionalBodyRequest, CreateAdditionalResponse } from '@modules/additional/schemas/CreateAdditionalSchema'
import { CreateAdditionalInputDTO } from "@modules/additional/dto/CreateAdditionalInputDTO";
import { CreateAdditionalOutputDTO } from "@modules/additional/dto/CreateAdditionalOutputDTO";

const requestBodySchema = z.object({
  min: z.number(),
  max: z.number(),
}).superRefine((value, ctx) => {
  if (value.min > value.max) {
    ctx.addIssue({
      code: 'custom',
      message: 'O campo minímo deve ser menor ou igual ao campo máximo.'
    });
  }
});

@singleton()
export class CreateAdditionalTransformer {
  public fromApi(request?: FastifyRequest<{ Body: CreateAdditionalBodyRequest }>): CreateAdditionalInputDTO {
    if (!request) {
      throw new Error("Request is required");
    }
    const { body } = request;

    validateRequest(requestBodySchema, body);

    return {
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
