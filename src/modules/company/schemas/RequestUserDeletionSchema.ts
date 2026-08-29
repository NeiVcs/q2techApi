import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Request user deletion.',
  summary: 'Request user deletion.',
  tags: ['Company'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['password', 'id'],
    properties: {
      password: {
        type: 'string',
        minLength: 6,
        errorMessage: { minLength: 'A senha deve ter pelo menos 6 caracteres.' }
      },
      id: {
        type: 'string',
        description: 'MongoDB Id.',
        pattern: '^[0-9a-fA-F]{24}$',
        errorMessage: 'Id deve ser um MongoDB Id.'
      },
    },
    errorMessage: {
      required: {
        password: 'Senha é um campo obrigatório.',
        id: 'Id da empresa é um campo obrigatório.',
      }
    },
    examples: [
      {
        password: 'senha123',
        id: '6a8dfc30551e1f937d6768e1'
      }
    ]
  },
  response: {
    204: {
      description: 'Enviado e-mail de confirmação.',
      type: 'null'
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

export const RequestUserDeletionSchema = schema.raw;
export type RequestUserDeletionBodyRequest = typeof schema.types.body;
export type RequestUserDeletionResponse = (typeof schema.types.response)[204];
