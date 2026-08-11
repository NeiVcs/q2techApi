import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Delete image.',
  summary: 'Delete image on claudinary.',
  tags: ['Cloudinary'],
  security: [{ ApiKeyAuth: [] }],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        description: 'Cloudinary Id.',
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

export const DeleteImageSchema = schema.raw;
export type DeleteImageParamsRequest = typeof schema.types.params;
export type DeleteImageResponse = (typeof schema.types.response)[204];
