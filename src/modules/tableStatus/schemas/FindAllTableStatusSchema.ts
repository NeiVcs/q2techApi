import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a list of table status.',
  summary: 'Query a list of table status.',
  tags: ['TableStatus'],
  security: [{ ApiKeyAuth: [] }],
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
              companyId: { type: 'string', description: 'company id.' },
              userId: { type: 'string', description: 'user id.' },
              status: { type: 'string', description: 'status.' },
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

export const FindAllTableStatusSchema = schema.raw;
export type FindAllTableStatusResponse = (typeof schema.types.response)[200];
