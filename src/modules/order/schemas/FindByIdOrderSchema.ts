import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a order.',
  summary: 'Query a order.',
  tags: ['Order'],
  security: [{ ApiKeyAuth: [] }],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        description: 'MongoDB Id.',
        pattern: '^[0-9a-fA-F]{24}$',
        errorMessage: 'Id deve ser um MongoDB Id.'
      }
    }
  },
  response: {
    200: {
      description: 'Returned successfully.',
      type: 'object',
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'ID do pedido' },
        companyId: { type: 'string', description: 'ID da empresa' },
        status: { type: 'string', description: 'Status atual do pedido' },
        paymentForm: { type: 'string', description: 'Forma de pagamento' },
        totalPrice: { type: 'number', description: 'Preço total' },
        payedPrice: { type: 'number', description: 'Preço pago' },
        change: { type: 'number', description: 'Troco' },
        deliveryMode: { type: 'string', description: 'Modo de entrega' },
        rating: { type: 'number', nullable: true, description: 'Avaliação' },
        notification: { type: 'string', nullable: true },
        createdAt: { type: 'string', format: 'date-time' },
        userData: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            phoneNumber: { type: 'string' },
            address: {
              type: 'object',
              properties: {
                zipCode: { type: 'string' },
                street: { type: 'string' },
                number: { type: 'string' },
                neighborhood: { type: 'string' },
                city: { type: 'string' },
                state: { type: 'string' },
                complement: { type: 'string', nullable: true },
                reference: { type: 'string', nullable: true }
              }
            }
          }
        },
        orderData: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              productId: { type: 'string' },
              name: { type: 'string' },
              quantity: { type: 'number' },
              price: { type: 'number' },
              observation: { type: 'string', nullable: true },
              additional: {
                type: 'array',
                nullable: true,
                items: {
                  type: 'object',
                  properties: {
                    additionalId: { type: 'string' },
                    name: { type: 'string' },
                    quantity: { type: 'number' },
                    price: { type: 'number' }
                  }
                }
              }
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

export const FindByIdOrderSchema = schema.raw;
export type FindByIdOrderParamsRequest = typeof schema.types.params;
export type FindByIdOrderResponse = (typeof schema.types.response)[200];
