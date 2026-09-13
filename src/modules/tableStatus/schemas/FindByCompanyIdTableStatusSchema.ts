import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a table status.',
  summary: 'Query a table status.',
  tags: ['TableStatus'],
  security: [{ ApiKeyAuth: [] }],
  params: {
    type: 'object',
    required: ['companyId'],
    properties: {
      companyId: {
        type: 'string',
        description: 'MongoDB Id.',
        pattern: '^[0-9a-fA-F]{24}$',
        errorMessage: 'Id deve ser um MongoDB Id.'
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
              id: { type: 'string', nullable: true, description: 'id.' },
              companyId: { type: 'string', description: 'companyId.' },
              userId: { type: 'string', description: 'userId.' },
              status: { type: 'string', description: 'status.' },
            },
          },
        },
      },
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

export const FindByCompanyIdTableStatusSchema = schema.raw;
export type FindByCompanyIdTableStatusParamsRequest = typeof schema.types.params;
export type FindByCompanyIdTableStatusResponse = (typeof schema.types.response)[200];
