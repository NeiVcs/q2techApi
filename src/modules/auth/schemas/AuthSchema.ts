import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Create an auth session.',
  summary: 'Authenticate user.',
  tags: ['Auth'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['email', 'password'],
    properties: {
      email: {
        type: 'string',
        minLength: 1,
        errorMessage: { minLength: 'Login é obrigatório.' }
      },
      password: {
        type: 'string',
        minLength: 6,
        errorMessage: { minLength: 'A senha deve ter pelo menos 6 caracteres.' }
      }
    },
    errorMessage: {
      required: {
        email: 'Login é um campo obrigatório.',
        password: 'Senha é um campo obrigatório.'
      }
    },
    examples: [
      {
        email: 'joao.silva@email.com',
        password: 'senha123'
      }
    ]
  },
  response: {
    200: {
      description: 'Logged successfully.',
      type: 'object',
      properties: {
        token: { type: 'string', description: 'JWT Access Token' },
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

export const AuthSchema = schema.raw;
export type AuthBodyRequest = typeof schema.types.body;
export type AuthResponse = (typeof schema.types.response)[200];
