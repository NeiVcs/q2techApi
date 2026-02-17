import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Can only update order status to `PEDIDO_APROVADO` or `PEDIDO_CANCELADO`.',
  summary: 'Update a bill payment order.',
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
    required: ['entityId', 'status', 'user'],
    properties: {
      entityId: {
        type: 'string',
        format: 'uuid',
        description: 'Entity ID in internal system.',
        errorMessage: {
          required: 'O campo ID da Entidade é obrigatório.',
          format: 'O campo ID da Entidade precisa ser um uuid.'
        }
      },
      status: {
        type: 'string',
        description: 'Bill payment order status',
        enum: ['PEDIDO_APROVADO', 'PEDIDO_CANCELADO']
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
        status: 'PEDIDO_APROVADO',
        user: {
          userId: 'd4e5f6a7-8091-2b3c-4d5e-6f7a8b9c0d1e',
          userName: 'John Doe'
        }
      }
    ],
    errorMessage: {
      required: {
        entityId: 'O campo entityId é obrigatório.',
        user: 'O campo user é obrigatório.',
        status: 'O campo status é obrigatório.'
      }
    }
  },
  response: {
    204: {
      description: 'Updated successfully.'
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

export const UpdateBillPaymentsSchema = schema.raw;
export type UpdateBillPaymentsParamsRequest = typeof schema.types.params;
export type UpdateBillPaymentsBodyRequest = typeof schema.types.body;
