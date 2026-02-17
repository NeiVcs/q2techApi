import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a bill payment order.',
  summary: 'Query a bill payment order.',
  tags: ['Bill Payments'],
  security: [{ ApiKeyAuth: [] }],
  querystring: {
    type: 'object',
    required: ['page', 'pageSize'],
    properties: {
      id: {
        type: 'string',
        format: 'uuid',
        description: 'Id do pedido.',
        errorMessage: {
          format: 'O campo id deve ser um UUID válido.'
        }
      },
      page: {
        type: 'number',
        minimum: 0,
        description: 'Número da página para paginação.',
        errorMessage: {
          minimum: 'O campo page deve ser maior ou igual a 0.'
        }
      },
      pageSize: {
        type: 'number',
        minimum: 1,
        maximum: 500,
        description: 'Número de itens por página para paginação.',
        errorMessage: {
          minimum: 'O campo pageSize deve ser maior ou igual a 1.',
          maximum: 'O campo pageSize deve no máximo a 500.'
        }
      },
      startDate: {
        type: 'string',
        format: 'date',
        description: 'Data inicio do pedido.',
        errorMessage: {
          format: 'A data de início deve estar no formato: YYYY-MM-DD.'
        }
      },
      endDate: {
        type: 'string',
        format: 'date',
        description: 'Data fim do pedido.',
        errorMessage: {
          format: 'A data fim deve estar no formato: YYYY-MM-DD.'
        }
      },
      status: {
        type: 'string',
        description: 'Bill payment status filter',
        enum: [
          'PENDENTE_APROVACAO',
          'PEDIDO_APROVADO',
          'PEDIDO_CANCELADO',
          'AGUARDANDO_PAGAMENTO_TARIFA',
          'PAGAMENTO_TARIFA_REALIZADO',
          'AGUARDANDO_EXECUCAO_PAGAMENTO',
          'EM_PROCESSAMENTO',
          'PEDIDO_FINALIZADO',
          'PEDIDO_FINALIZADO_ERROR'
        ],
        errorMessage: {
          enum: 'O campo status deve ser um dos seguintes valores pré definidos.'
        }
      },
      segment: {
        type: 'string',
        description: 'Bill payment segment filter',
        enum: ['BOLETO_PJ', 'BOLETO_PF'],
        errorMessage: {
          enum: 'O campo segment deve ser um dos seguintes valores pré definidos.'
        }
      },
      entityId: {
        type: 'string',
        format: 'uuid',
        description: 'Entity ID in internal system.',
        errorMessage: {
          required: 'O campo ID da Entidade é obrigatório.',
          format: 'O campo ID da Entidade precisa ser um uuid.'
        }
      }
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
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            pageSize: { type: 'number' },
            total: { type: 'number' }
          }
        },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'Id of the bill payment order.' },
              entityId: { type: 'string', description: 'entity Id of the bill payment order.' },
              entityAccountId: { type: 'string', description: 'entity account Id of the bill payment order.' },
              status: { type: 'string', description: 'Bill payment order status.' },
              segment: { type: 'string', description: 'segmento of the bill payment order.' },
              withdrawType: {
                type: 'string',
                description: 'Withdraw type.',
                enum: ['Boleto', 'Utilities']
              },
              billPaymentTotalValue: { type: 'number', description: 'bill payment total value of the bill payment order.' },
              totalFeeValue: { type: 'number', description: 'Total fee amount of the bill payment order.' },
              totalOrderValue: { type: 'number', description: 'total order value of the bill payment order.' },
              updatedAt: { type: 'string', format: 'date-time', description: 'Date and time the payment request for the bill was updated.' },
              createdAt: { type: 'string', format: 'date-time', description: 'Date and time the payment request for the bill was created.' }
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

export const FindBillPaymentsListSchema = schema.raw;
export type FindBillPaymentsListQueryRequest = typeof schema.types.querystring;
export type FindBillPaymentsListResponse = (typeof schema.types.response)[200];
