import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindAllImagesQueryRequest, FindAllImagesResponse } from '@modules/cloudinary/schemas/FindAllImagesSchema'
import { FindAllImagesInputDTO } from "@modules/cloudinary/dto/FindAllImagesInputDTO";
import { FindAllImagesOutputDTO } from "@modules/cloudinary/dto/FindAllImagesOutputDTO";
import { FindAllImagesItemsItemDTO } from "@modules/cloudinary/dto/FindAllImagesItemsItemDTO";
import { FindAllImagesImagesItemDTO } from "@modules/cloudinary/dto/FindAllImagesImagesItemDTO";



@singleton()
export class FindAllImagesTransformer {
  public fromApi(request?: FastifyRequest<{ Querystring: FindAllImagesQueryRequest }>): FindAllImagesInputDTO {
    const { query } = request;

    return {
      pageSize: query?.pageSize,
    };
  }

  public toApi(outputDTO: FindAllImagesOutputDTO): FindAllImagesResponse {

    return {
      pagination: outputDTO?.pagination ? {
        page: 0,
        pageSize: outputDTO?.pagination?.pageSize ?? outputDTO?.pagination?.total,
        total: outputDTO?.pagination?.total ?? 0,
      } : undefined,
      items: Array.isArray(outputDTO?.items) ? outputDTO.items.map(f => ({
        id: f?.public_id ?? '',
        filename: f?.filename ?? '',
        format: f?.format ?? '',
        createdAt: f?.created_at ?? '',
        size: `${(f?.bytes / 1024).toFixed(2)}kb`,
        uploaded_at: f?.format ?? '',
        url: f?.secure_url,
      })) : [],
    };
  }
}
