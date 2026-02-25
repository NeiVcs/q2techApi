import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a list of additional.',
  summary: 'Query a list of additional.',
  tags: ['Additional'],
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
            page: { type: 'number', description: 'page.' },
            pageSize: { type: 'number', description: 'page size.' },
            total: { type: 'number', description: 'total.' },
          },
        },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'id.' },
              name: { type: 'string', description: 'name.' },
              min: { type: 'number', description: '1' },
              max: { type: 'number', description: '2' },
              productIdList: {
                type: 'array',
                items: {
                  type: 'string',
                  description: 'gender.'
                },
              }
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

export const FindAllAdditionalSchema = schema.raw;
export type FindAllAdditionalQueryRequest = typeof schema.types.querystring;
export type FindAllAdditionalResponse = (typeof schema.types.response)[200];
