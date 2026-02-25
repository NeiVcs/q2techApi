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
      active: body?.active !== null && body?.active !== undefined ? body?.active : true,
      isAdditional: body?.isAdditional !== null && body?.isAdditional !== undefined ? body?.isAdditional : false,
      description: body?.description || '',
      imgUrl: body?.imgUrl || '',
      price: body?.price || 0,
      previewPrice: body?.previewPrice || 0,
      additionalIdList: body?.additionalIdList || null,
    };
  }

  public toApi(outputDTO: CreateProductOutputDTO): CreateProductResponse {
    return {
      id: outputDTO?.id ?? '',
    };
  }
}
