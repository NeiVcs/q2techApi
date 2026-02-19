import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Update pay a fee for a bill payment order.',
  summary: 'Update pay a fee for a bill payment order',
  tags: ['Bill Payments'],
  security: [{ ApiKeyAuth: [] }],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'string', description: 'Id of the bill payment order.' }
    }
  },
  body: {
    type: 'object',
    required: ['entityId', 'user', 'feeTransactionId'],
    properties: {
      entityId: {
        type: 'string',
        format: 'uuid',
        description: 'Entity ID in internal system.',
        errorMessage: {
          format: 'O campo ID da Entidade precisa ser um uuid.'
        }
      },
      feeTransactionId: {
        type: 'string',
        format: 'uuid',
        description: 'Fee transaction ID.',
        errorMessage: {
          format: 'O campo feeTransactionId precisa ser um uuid.'
        }
      },
      user: {
        type: 'object',
        description: 'User information making the request.',
        properties: {
          userId: {
            type: 'string',
            format: 'uuid',
            description: 'UUID of the user.'
          },
          userName: {
            type: 'string',
            description: 'Name of the user.'
          }
        },
        required: ['userId', 'userName'],
        errorMessage: {
          required: {
            id: 'O campo id do usuário é obrigatório.',
            name: 'O campo nome do usuário é obrigatório.'
          }
        }
      }
    },
    examples: [
      {
        entityId: 'b1a8f1e2-3c4d-5e6f-7081-91a2b3c4d5e6',
        user: {
          userId: 'd4e5f6a7-8901-2345-6789-0a1b2c3d4e5f',
          userName: 'John Doe'
        },
        feeTransactionId: 'c3d4e5f6-a7b8-9012-3456-7890a1b2c3d4'
      }
    ],
    errorMessage: {
      required: {
        entityId: 'O campo entityId é obrigatório.',
        feeTransactionId: 'O campo feeTransactionId é obrigatório.',
        user: 'O campo user é obrigatório.'
      }
    }
  },
  response: {
    204: {
      description: 'Updated fee pay successfully.'
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

export const FeePayBillPaymentsSchema = schema.raw;
export type FeePayBillPaymentsParamsRequest = typeof schema.types.params;
export type FeePayBillPaymentsBodyRequest = typeof schema.types.body;
