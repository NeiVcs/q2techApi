import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Update a additional.',
  summary: 'Update a additional.',
  tags: ['Additional'],
  security: [{ ApiKeyAuth: [] }],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        description: 'MongoDB Id.',
        pattern: '^[0-9a-fA-F]{24}$',
        errorMessage: 'Id deve ser um MongoDB Id.'
      }
    }
  },
  body: {
    type: 'object',
    properties: {
      companyId: {
        type: 'string',
        description: 'name',
        pattern: '^[0-9a-fA-F]{24}$',
        minLength: 1,
        errorMessage: {
          minLength: 'Id da empresa deve ter pelo menos 1 caractere.'
        }
      },
      category: {
        type: 'string',
        description: 'name',
        minLength: 1,
        errorMessage: {
          minLength: 'Categoria deve ter pelo menos 1 caractere.'
        }
      },
      name: {
        type: 'string',
        description: 'name',
        minLength: 1,
        errorMessage: {
          minLength: 'Nome deve ter pelo menos 1 caractere.'
        }
      },
      min: {
        type: 'number',
        description: 'mínimo.',
        minimum: 0,
        errorMessage: {
          type: 'Quantidade mínima deve ser um número.',
          minimum: 'Quantidade mínima deve ser maior que 0.'
        }
      },
      max: {
        type: 'number',
        description: 'máximo.',
        minimum: 0,
        errorMessage: {
          type: 'Quantidade máxima deve ser um número.',
          minimum: 'Quantidade máxima deve ser pelo menos 1.'
        }
      },
      productList: {
        type: 'array',
        description: 'productList.',
        items: {
          type: 'object',
          required: ['productId', 'price'],
          properties: {
            productId: {
              type: 'string',
              pattern: '^[0-9a-fA-F]{24}$',
              description: 'ID do produto.'
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Preço unitário do produto.'
            }
          }
        },
        errorMessage: {
          type: 'productList deve ser um array.',
        }
      },
    },
    examples: [
      {
        companyId: '65f1a2b3c4d5e6f7a8b9c0d1',
        category: 'sabor',
        name: 'sabor',
        min: 0,
        max: 3,
        productList: [
          {
            productId: '65f1a2b3c4d5e6f7a8b9c0d1',
            price: 10.0
          }
        ]
      }
    ]
  },
  response: {
    204: {
      description: 'Updated successfully.',
      required: ['id']
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

export const UpdateAdditionalSchema = schema.raw;
export type UpdateAdditionalBodyRequest = typeof schema.types.body;
export type UpdateAdditionalParamsRequest = typeof schema.types.params;
export type UpdateAdditionalResponse = (typeof schema.types.response)[204];
