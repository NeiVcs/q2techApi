import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Update a user.',
  summary: 'Update a user.',
  tags: ['User'],
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
      name: { type: 'string', minLength: 1 },
      email: { type: 'string', format: 'email' },
      phoneNumber: { type: 'string' },
      whatsapp: { type: 'string' },
      active: { type: 'boolean' },
      address: {
        type: 'object',
        properties: {
          zipCode: { type: 'string', minLength: 8 },
          street: { type: 'string' },
          number: { type: 'string' },
          neighborhood: { type: 'string' },
          city: { type: 'string' },
          state: { type: 'string', minLength: 2, maxLength: 2 },
          complement: { type: 'string' }
        }
      },
      companyDataList: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            companyId: { type: 'string', description: 'Id da empresa vinculada.' },
            resource: { type: 'string' },
            plan: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                value: { type: 'number' },
                validate: { type: 'string' }
              }
            },
            billing: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  dueDate: { type: 'string' },
                  value: { type: 'number' },
                  status: { type: 'string' }
                }
              }
            }
          }
        }
      },
      lastLogin: { type: 'string', format: 'date-time' }
    },
    errorMessage: {
      required: {
        userId: 'Id da loja é um campo obrigatório',
        name: 'Nome é um campo obrigatório.',
        category: 'Categoria é um campo obrigatório.',
        isAdditional: 'Apenas adicional é um campo obrigatório.',
        description: 'Descrição é um campo obrigatório.',
        price: 'Preço é um campo obrigatório.',
      }
    },
    examples: [

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

export const UpdateUserSchema = schema.raw;
export type UpdateUserBodyRequest = typeof schema.types.body;
export type UpdateUserParamsRequest = typeof schema.types.params;
export type UpdateUserResponse = (typeof schema.types.response)[204];
