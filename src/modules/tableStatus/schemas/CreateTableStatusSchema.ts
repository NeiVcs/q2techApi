import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Create a table status.',
  summary: 'Create a table status.',
  tags: ['TableStatus'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['companyId', 'userId', 'status'],
    properties: {
      companyId: {
        type: 'string',
        description: 'name',
        minLength: 1,
        pattern: '^[0-9a-fA-F]{24}$',
        errorMessage: {
          minLength: 'companyId deve ser um mongoDb Id.'
        }
      },
      userId: {
        type: 'string',
        description: 'name',
        minLength: 1,
        pattern: '^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$',
        errorMessage: {
          minLength: 'userId deve ser um uuid.'
        }
      },
      status: {
        type: 'string',
        description: 'status',
        minLength: 1,
        errorMessage: {
          minLength: 'Status deve ter pelo menos 1 caractere.'
        }
      },
    },
    errorMessage: {
      required: {
        companyId: 'CompanyId é um campo obrigatório.',
        userId: 'UserId é um campo obrigatório.',
        status: 'Status é um campo obrigatório.',
      }
    },
    examples: [
      {
        id: '69ac30195918d981a9f67254',
        companyId: '69ac30195918d981a9f67254',
        userId: '69ac30195918d981a9f67254',
        status: 'HELP',
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

export const CreateTableStatusSchema = schema.raw;
export type CreateTableStatusBodyRequest = typeof schema.types.body;
export type CreateTableStatusResponse = (typeof schema.types.response)[201];
