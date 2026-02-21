import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a list of music.',
  summary: 'Query a list of music.',
  tags: ['Music'],
  security: [{ ApiKeyAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'music name'
      },
      category: {
        type: 'string',
        description: 'music category',
        enum: ['a', 'm', 'l'],
        errorMessage: 'Categoria deve ser um dos seguintes valores: a, m, l.'
      },
      artist: {
        type: 'string',
        description: 'artist name'
      },
      gender: {
        type: 'string',
        description: 'music gender',
        enum: ['hm', 'mn', 'lm', 'ps', 'ar', 'po', 'gm', 'fb', 'rn', 'pr', 'jr', 'cl', 'bd'],
        errorMessage: 'Gênero deve ser um dos seguintes valores: hm, mn, lm, ps, ar, po, gm, fb, rn, pr, jr, cl ou bd.'
      }
    }
  },
  response: {
    200: {
      description: 'Returned successfully.',
      type: 'object',
      properties: {
        // pagination: {
        //   type: 'object',
        //   properties: {
        //     page: { type: 'number' },
        //     pageSize: { type: 'number' },
        //     total: { type: 'number' }
        //   }
        // },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'id.' },
              name: { type: 'string', description: 'name.' },
              category: { type: 'string', description: 'category.' },
              artist: { type: 'string', description: 'artist.' },
              gender: { type: 'string', description: 'gender.' },
              link: { type: 'string', description: 'link.' }
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

export const FindAllMusicSchema = schema.raw;
export type FindAllMusicQueryRequest = typeof schema.types.querystring;
export type FindAllMusicResponse = (typeof schema.types.response)[200];
