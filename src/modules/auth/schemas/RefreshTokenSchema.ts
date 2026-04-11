import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Refresh token.',
  summary: 'Refresh user token.',
  tags: ['Auth'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['token'],
    properties: {
      token: {
        type: 'string',
        minLength: 10,
        errorMessage: { minLength: 'Token é obrigatório.' }
      }
    },
    errorMessage: {
      required: {
        token: 'Token é um campo obrigatório.'
      }
    },
    examples: [
      {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
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

export const RefreshTokenSchema = schema.raw;
export type RefreshTokenBodyRequest = typeof schema.types.body;
export type RefreshTokenResponse = (typeof schema.types.response)[200];
