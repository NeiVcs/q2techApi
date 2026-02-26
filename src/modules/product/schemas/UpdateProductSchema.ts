import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Update a product.',
  summary: 'Update a product.',
  tags: ['Product'],
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
    required: ['id'],
    properties: {
      companyId: {
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
      active: {
        type: 'boolean',
        description: 'active',
      },
      isProduct: {
        type: 'boolean',
        description: 'isProduct',
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
      ProductIdList: {
        type: 'array',
        description: 'Lista de MongoDB Ids dos adicionais.',
        items: {
          type: 'string',
          pattern: '^[0-9a-fA-F]{24}$',
          errorMessage: {
            pattern: 'Cada Id da lista de adicionais deve ser um MongoDB Id válido.'
          }
        },
      },
    },
    examples: [
      {
        companyId: '65f1a2b3c4d5e6f7a8b9c0d1',
        name: 'cachorro quente simples',
        category: 'hotdogs',
        description: 'salsicha, purê de batata, milho, ervilha e molhos',
        active: false,
        isProduct: false,
        imgUrl: 'enderecodaimagem.com',
        price: 5,
        previewPrice: 5.99,
        ProductIdList: ['65f1a2b3c4d5e6f7a8b9c0d1'],
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

export const UpdateProductSchema = schema.raw;
export type UpdateProductBodyRequest = typeof schema.types.body;
export type UpdateProductParamsRequest = typeof schema.types.params;
export type UpdateProductResponse = (typeof schema.types.response)[204];
