import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Update a music.',
  summary: 'Update a music.',
  tags: ['Music'],
  security: [{ ApiKeyAuth: [] }],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'Id.' }
    }
  },
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'name',
      },
      category: {
        type: 'string',
        description: 'category.',
      },
      artist: {
        type: 'string',
        description: 'artist.'
      },
      gender: {
        type: 'string',
        description: 'gender.',
      },
      link: {
        type: 'string',
        description: 'link.'
      }
    },
    examples: [
      {
        name: 'musica',
        category: 'heavy',
        artist: 'angra',
        gender: 'heavy',
        link: 'abc'
      }
    ]
  },
  response: {
    204: {
      description: 'Updated successfully.',
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', example: '01992691-67f2-7189-bc1c-eb6a52222fdd' },
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

export const UpdateMusicSchema = schema.raw;
export type UpdateMusicBodyRequest = typeof schema.types.body;
export type UpdateMusicParamsRequest = typeof schema.types.params;
export type UpdateMusicResponse = (typeof schema.types.response)[204];
