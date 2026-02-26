import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Create a additional.',
  summary: 'Create a additional.',
  tags: ['Additional'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['companyId', 'category', 'name', 'min', 'max', 'productIdList'],
    properties: {
      companyId: {
        type: 'string',
        description: 'name',
        minLength: 1,
        pattern: '^[0-9a-fA-F]{24}$',
        errorMessage: {
          minLength: 'Id da empresa deve ser um mongoDb Id.'
        }
      },
      category: {
        type: 'string',
        description: 'category',
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
          type: 'A quantidade mínima deve ser um número.',
          minimum: 'Quantidade mínima deve ser maior que 0.'
        }
      },
      max: {
        type: 'number',
        description: 'máximo.',
        minimum: 0,
        errorMessage: {
          type: 'A quantidade máxima deve ser um número.',
          minimum: 'A quantidade máxima deve ser pelo menos 1.'
        }
      },
      productIdList: {
        type: 'array',
        description: 'productIdList.',
        items: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$',
          minLength: 1
        },
        minItems: 1,
        errorMessage: {
          type: 'productIdList deve ser um array.',
          minItems: 'A lista de produtos deve conter pelo menos 1 ID.'
        }
      },
    },

    errorMessage: {
      required: {
        companyId: 'Id da empresa é um campo obrigatório.',
        category: 'Categoria é um campo obrigatório.',
        name: 'Nome é um campo obrigatório.',
        min: 'quantidade mínima é um campo obrigatório.',
        max: 'Quantidade máxima é um campo obrigatório.',
        productIdList: 'Lista de produtos é um campo obrigatório'
      }
    },
    examples: [
      {
        name: 'sabor',
        min: 0,
        max: 3,
        productIdList: ['65f1a2b3c4d5e6f7a8b9c0d1'],
      }
    ]
  },
  response: {
    201: {
      description: 'Created successfully.',
      type: 'object',
      properties: {
        id: { type: 'string', format: 'mongoId', example: '65f1a2b3c4d5e6f7a8b9c0d1' }
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

export const CreateAdditionalSchema = schema.raw;
export type CreateAdditionalBodyRequest = typeof schema.types.body;
export type CreateAdditionalResponse = (typeof schema.types.response)[201];
