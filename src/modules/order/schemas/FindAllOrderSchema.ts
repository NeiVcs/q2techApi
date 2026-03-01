import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a list of company.',
  summary: 'Query a list of company.',
  tags: ['Order'],
  security: [{ ApiKeyAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      companyId: {
        type: 'string',
        description: 'Filter orders by company ID'
      },
      status: {
        type: 'string',
        description: 'Filter by order status (e.g., PENDING, DELIVERED)'
      },
      page: {
        type: 'number',
        description: 'page',
        minimum: 1,
        errorMessage: {
          minimum: 'A página deve ser maior que 0.'
        }
      },
      pageSize: {
        type: 'number',
        description: 'page size',
        minimum: 1,
        errorMessage: {
          minimum: 'O tamanho da página deve ser maior que 0.'
        }
      },
    }
  },
  response: {
    200: {
      description: 'Returned successfully.',
      type: 'object',
      properties: {
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number', description: 'page.' },
            pageSize: { type: 'number', description: 'page size.' },
            total: { type: 'number', description: 'total.' },
          },
        },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', format: 'mongoId' },
              companyId: { type: 'string' },
              paymentForm: { type: 'string' },
              totalPrice: { type: 'number' },
              payedPrice: { type: 'number' },
              change: { type: 'number' },
              deliveryMode: { type: 'string' },
              status: { type: 'string' },
              rating: { type: 'number', nullable: true },
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
                      state: { type: 'string' }
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
                    observation: { type: 'string', nullable: true }
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

export const FindAllOrderSchema = schema.raw;
export type FindAllOrderQueryRequest = typeof schema.types.querystring;
export type FindAllOrderResponse = (typeof schema.types.response)[200];
