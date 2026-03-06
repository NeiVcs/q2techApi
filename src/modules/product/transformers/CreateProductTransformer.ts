import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { CreateProductBodyRequest, CreateProductResponse } from '@modules/product/schemas/CreateProductSchema'
import { CreateProductInputDTO } from "@modules/product/dto/CreateProductInputDTO";
import { CreateProductOutputDTO } from "@modules/product/dto/CreateProductOutputDTO";

@singleton()
export class CreateProductTransformer {
  public fromApi(request?: FastifyRequest<{ Body: CreateProductBodyRequest }>): CreateProductInputDTO {
    const { body } = request;

    return {
      companyId: body?.companyId || '',
      name: body?.name || '',
      category: body?.category || '',
      description: body?.description || '',
      active: body?.active || false,
      isAdditional: body?.isAdditional || false,
      imgUrl: body?.imgUrl || '',
      price: body?.price || 0,
      previewPrice: body?.previewPrice || 0,
      additionalIdList: Array.isArray(body?.additionalIdList) ? [...body.additionalIdList] : [],
    };
  }

  public toApi(outputDTO: CreateProductOutputDTO): CreateProductResponse {
    return {
      id: outputDTO?.id ?? '',
    };
  }
}
