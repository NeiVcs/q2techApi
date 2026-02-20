import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Create a music.',
  summary: 'Create a music.',
  tags: ['Music'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['name', 'category', 'gender'],
    properties: {
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
        description: 'category.',
        minLength: 1,
        errorMessage: {
          minLength: 'Categoria deve ter pelo menos 1 caractere.'
        }
      },
      artist: {
        type: 'string',
        description: 'artist.'
      },
      gender: {
        type: 'string',
        description: 'gender.',
        minLength: 1,
        errorMessage: {
          minLength: 'Gênero deve ter pelo menos 1 caractere.'
        }
      },
      link: {
        type: 'string',
        description: 'link.'
      }
    },
    errorMessage: {
      required: {
        name: 'Nome é um campo obrigatório.',
        category: 'Categoria é um campo obrigatório.',
        gender: 'Gênero é um campo obrigatório.'
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
