import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a additional.',
  summary: 'Query a additional.',
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
  response: {
    200: {
      description: 'Returned successfully.',
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'id.' },
        name: { type: 'string', description: 'name.' },
        min: { type: 'string', description: 'category.' },
        max: { type: 'string', description: 'artist.' },
        productIdList: {
          type: 'array',
          items: {
            type: 'string',
            description: 'gender.'
          },
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

export const FindByIdAdditionalSchema = schema.raw;
export type FindByIdAdditionalParamsRequest = typeof schema.types.params;
export type FindByIdAdditionalResponse = (typeof schema.types.response)[200];
