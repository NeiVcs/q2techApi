import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Update a user password.',
  summary: 'Update a user password.',
  tags: ['User'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    properties: {
      email: { type: 'string', format: 'email' },
      password: { type: 'string', minLength: 6 },
      newPassword: { type: 'string', minLength: 6 },
      code: { type: 'string' }
    },
    errorMessage: {
      required: {
        password: 'Senha é um campo obrigatório.',
        newPassword: 'Nova senha é um campo obrigatório.',
        code: 'Código é um campo obrigatório.'
      }
    },
    required: ['email', 'newPassword', 'code']
  },
  response: {
    204: {
      description: 'Updated successfully.',
      required: ['id']
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

export const UpdateUserPasswordSchema = schema.raw;
export type UpdateUserPasswordBodyRequest = typeof schema.types.body;
export type UpdateUserPasswordParamsRequest = typeof schema.types.params;
export type UpdateUserPasswordResponse = (typeof schema.types.response)[204];
