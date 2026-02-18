import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a music.',
  summary: 'Query a music.',
  tags: ['Music'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['name', 'category', 'gender'],
    properties: {
      name: {
        type: 'string',
        description: 'name',
        errorMessage: {
          required: {
            segment: 'name é obrigatório.'
          },
        }
      },
      category: {
        type: 'string',
        description: 'category.',
        errorMessage: {
          required: 'category é obrigatório.',
        }
      },
      artist: {
        type: 'string',
        description: 'artist.',
      },
      gender: {
        type: 'string',
        description: 'gender.',
        errorMessage: {
          format: 'gender é obrigatório.'
        }
      },
      link: {
        type: 'string',
        description: 'link.',
      },
    },
    errorMessage: {
      required: {
        name: 'erro',
        category: 'erro',
        gender: 'erro',
      }
    },
    examples: [
      {
        name: 'musica',
        category: 'heavy',
        artist: 'angra',
        gender: 'heavy',
        link: 'abc',
      }
    ]
  },
  response: {
    201: {
      description: 'Created successfully.',
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', example: '01992691-67f2-7189-bc1c-eb6a52222fdd' },
        createdAt: { type: 'string', format: 'date-time', example: '2025-06-19 10:14:09.860' }
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

export const CreateMusicSchema = schema.raw;
export type CreateMusicBodyRequest = typeof schema.types.body;
export type CreateMusicResponse = (typeof schema.types.response)[201];
