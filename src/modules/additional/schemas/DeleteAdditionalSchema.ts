import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Delete a additional.',
  summary: 'Delete a additional.',
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
    204: {
      description: 'Deleted successfully.'
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

export const DeleteAdditionalSchema = schema.raw;
export type DeleteAdditionalParamsRequest = typeof schema.types.params;
export type DeleteAdditionalResponse = (typeof schema.types.response)[204];
