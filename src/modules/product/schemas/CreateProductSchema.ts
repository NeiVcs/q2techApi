import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Create a product.',
  summary: 'Create a product.',
  tags: ['Product'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['storeId', 'name', 'category', 'description', 'price'],
    properties: {
      storeId: {
        type: 'string',
        description: 'MongoDB Id.',
        pattern: '^[0-9a-fA-F]{24}$',
        errorMessage: {
          pattern: 'Id da loja deve ser um MongoDB Id.'
        },
      },
      name: {
        type: 'string',
        description: 'name',
        minLength: 1,
        errorMessage: {
          minLength: 'Nome deve ter pelo menos 1 caractere.'
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
      description: {
        type: 'string',
        description: 'name',
        minLength: 1,
        errorMessage: {
          minLength: 'Descrição deve ter pelo menos 1 caractere.'
        }
      },
      imgUrl: {
        type: 'string',
        description: 'name',
      },
      price: {
        type: 'number',
        description: 'mínimo.',
        minimum: 0,
        errorMessage: {
          type: 'Preço mínimo deve ser um número.',
          minimum: 'Preço mínima deve ser maior que 0.'
        }
      },
      previewPrice: {
        type: 'number',
        description: 'máximo.',
        minimum: 0,
        errorMessage: {
          type: 'Preço anterios mínimo deve ser um número.',
          minimum: 'Preço anterios mínimo deve ser pelo menos 1.'
        }
      },
      additionalListId: {
        type: 'string',
        description: 'MongoDB Id.',
        pattern: '^[0-9a-fA-F]{24}$',
        errorMessage: {
          pattern: 'Id da lista de adicionais deve ser um MongoDB Id.'
        },
      },
    },

    errorMessage: {
      required: {
        storeId: 'Id da loja é um campo obrigatório',
        name: 'Nome é um campo obrigatório.',
        category: 'Categoria é um campo obrigatório.',
        description: 'Descrição é um campo obrigatório.',
        price: 'Preço é um campo obrigatório.',
      }
    },
    examples: [
      {
        storeId: '65f1a2b3c4d5e6f7a8b9c0d1',
        name: 'cachorro quente simples',
        category: 'hotdogs',
        description: 'salsicha, purê de batata, milho, ervilha e molhos',
        isActived: true,
        imgUrl: 'enderecodaimagem.com',
        price: 5,
        previewPrice: 5.99,
        additionalListId: '65f1a2b3c4d5e6f7a8b9c0d1',
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

export const CreateProductSchema = schema.raw;
export type CreateProductBodyRequest = typeof schema.types.body;
export type CreateProductResponse = (typeof schema.types.response)[201];
