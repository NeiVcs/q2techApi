import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { UpdateProductBodyRequest, UpdateProductParamsRequest } from '@modules/product/schemas/UpdateProductSchema'
import { UpdateProductInputDTO } from "@modules/product/dto/UpdateProductInputDTO";

@singleton()
export class UpdateProductTransformer {
  public fromApi(request?: FastifyRequest<{ Body: UpdateProductBodyRequest; Params: UpdateProductParamsRequest }>): UpdateProductInputDTO {
    const { params, body } = request;

    return {
      id: params.id,
      companyId: body?.companyId || '',
      name: body?.name || '',
      category: body?.category || '',
      description: body?.description || '',
      active: body?.active || false,
      isProduct: body?.isProduct || false,
      imgUrl: body?.imgUrl || '',
      price: body?.price || 0,
      previewPrice: body?.previewPrice || 0,
      ProductIdList: Array.isArray(body?.ProductIdList) ? [...body.ProductIdList] : [],
    };
  }
}
