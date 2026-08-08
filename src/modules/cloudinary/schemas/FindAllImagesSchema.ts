import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a list of images on cloudinary.',
  summary: 'Query a list of images on cloudinary.',
  tags: ['Cloudinary'],
  security: [{ ApiKeyAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      page: {
        type: 'number',
        description: 'page',
        minimum: 1,
        errorMessage: {
          minimum: 'A página deve ser maior que 0.'
        }
      },
      pageSize: {
        type: 'number',
        description: 'page size',
        minimum: 1,
        errorMessage: {
          minimum: 'O tamanho da página deve ser maior que 0.'
        }
      },
    }
  },
  response: {
    200: {
      description: 'Returned successfully.',
      type: 'object',
      properties: {
        pagination: {
          type: 'object',
          properties: {
            pageSize: { type: 'number', description: 'page size.' },
            total: { type: 'number', description: 'total.' },
          },
        },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'total' },
              filename: { type: 'string', description: 'total' },
              format: { type: 'string', description: 'total' },
              createdAt: { type: 'string', description: 'total' },
              size: { type: 'string', description: 'total' },
              uploaded_at: { type: 'string', description: 'total' },
              url: { type: 'string', description: 'total' },
            }
          }
        }
      }
    },
    400: DefinitionsExceptionSchema.Error400,
    401: DefinitionsExceptionSchema.Error401,
    403: DefinitionsExceptionSchema.Error403,
    404: DefinitionsExceptionSchema.Error404,
    409: DefinitionsExceptionSchema.Error409,
    500: DefinitionsExceptionSchema.Error500,
    502: DefinitionsExceptionSchema.Error502,
    503: DefinitionsExceptionSchema.Error503,
    504: DefinitionsExceptionSchema.Error504
  }
});

export const FindAllImagesSchema = schema.raw;
export type FindAllImagesQueryRequest = typeof schema.types.querystring;
export type FindAllImagesResponse = (typeof schema.types.response)[200];
