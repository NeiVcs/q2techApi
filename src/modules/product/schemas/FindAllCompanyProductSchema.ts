import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a list of product.',
  summary: 'Query a list of product.',
  tags: ['Product'],
  security: [{ ApiKeyAuth: [] }],
  params: {
    type: 'object',
    required: ['CompanyId'],
    properties: {
      id: {
        type: 'string',
        description: 'MongoDB Id.',
        pattern: '^[0-9a-fA-F]{24}$',
        errorMessage: 'Id deve ser um MongoDB Id.'
      }
    }
  },
  querystring: {
    type: 'object',
    properties: {
      companyId: {
        type: 'string',
        description: 'product companyId'
      },
      name: {
        type: 'string',
        description: 'product name'
      },
      category: {
        type: 'string',
        description: 'product category',
      },
      active: {
        type: 'boolean',
        description: 'product activation'
      },
      isAdditional: {
        type: 'boolean',
        description: 'product activation'
      }
    }
  },
  response: {
    200: {
      description: 'Returned successfully.',
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'id.' },
              companyId: { type: 'string', description: 'companyId.' },
              name: { type: 'string', description: 'name.' },
              category: { type: 'string', description: 'category.' },
              description: { type: 'string', description: 'description.' },
              active: { type: 'boolean', description: 'active.' },
              isAdditional: { type: 'boolean', description: 'isAdditional.' },
              imgUrl: { type: 'string', description: 'imgUrl.' },
              price: { type: 'number', description: 'price.' },
              previewPrice: { type: 'number', description: 'previewPrice.' },
              additionalList: {
                description: 'Lista de adicionais',
                type: 'array',
                nullable: true,
                items: {
                  type: 'object',
                  properties: {
                    id: { type: 'string' },
                    name: { type: 'string' },
                    min: { type: 'number' },
                    max: { type: 'number' },
                    productIdList: {
                      type: 'array',
                      nullable: true,
                      items: { type: 'string' }
                    }
                  }
                }
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

export const FindAllProductSchema = schema.raw;
export type FindAllCompanyProductParamsRequest = typeof schema.types.params;
export type FindAllProductQueryRequest = typeof schema.types.querystring;
export type FindAllProductResponse = (typeof schema.types.response)[200];
