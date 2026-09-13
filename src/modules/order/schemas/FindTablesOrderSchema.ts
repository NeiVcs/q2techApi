import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query tables order.',
  summary: 'Query tables order.',
  tags: ['Order'],
  security: [{ ApiKeyAuth: [] }],
  params: {
    type: 'object',
    required: ['companyId'],
    properties: {
      companyId: {
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
      properties: {
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'ID do pedido' },
              status: { type: 'string', description: 'Status atual da mesa' },
              totalPrice: { type: 'number', description: 'Preço total' },
              createdAt: { type: 'string', format: 'date-time' },
              userData: {
                type: 'object',
                properties: {
                  userId: { type: 'string' },
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
                    status: { type: 'string' },
                    createdAt: { type: 'string', format: 'date-time' },
                    updatedAt: { type: 'string', format: 'date-time' },
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
      }
    }
  }
});

export const FindTablesOrderSchema = schema.raw;
export type FindTablesOrderParamsRequest = typeof schema.types.params;
export type FindTablesOrderResponse = (typeof schema.types.response)[200];
