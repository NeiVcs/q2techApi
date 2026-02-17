import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a music.',
  summary: 'Query a music.',
  tags: ['Musics'],
  security: [{ ApiKeyAuth: [] }],
  querystring: {
    type: 'object',
    //required: ['page', 'pageSize'],
    properties: {
      status: {
        type: 'string',
        //format: 'date',
        description: 'Bill payment status filter',
        enum: ['PENDENTE_APROVACAO'],
        errorMessage: { enum: 'O campo status deve ser um dos seguintes valores pré definidos.' }
      },
    },
    errorMessage: {
      required: {
        page: 'O campo page é obrigatório.',
        pageSize: 'O campo pageSize é obrigatório.',
        entityId: 'O campo entityId é obrigatório.'
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
              id: { type: 'string', description: 'Id of the bill payment order.' },
              name: { type: 'string', description: 'Id of the bill payment order.' },
              category: { type: 'string', description: 'Id of the bill payment order.' },
              artist: { type: 'string', description: 'Id of the bill payment order.' },
              gender: { type: 'string', description: 'Id of the bill payment order.' },
              link: { type: 'string', description: 'Id of the bill payment order.' },
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

export const ListAllMusicsSchema = schema.raw;
export type ListAllMusicsQueryRequest = typeof schema.types.querystring;
export type ListAllMusicsResponse = (typeof schema.types.response)[200];
