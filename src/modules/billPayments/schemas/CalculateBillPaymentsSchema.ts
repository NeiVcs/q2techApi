import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description:
    'Calculates the payment for an account. This result can be used to create a new payment order. The calculation considers the barcode and optional fees to provide detailed payment information. <br><br>**This result is cached**.',
  summary: 'Calculate a bill payments.',
  tags: ['Bill Payments'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['segment', 'accountId'],
    oneOf: [
      {
        required: ['barcode'],
        errorMessage: {
          required: {
            barcode: 'Informe o código de barras.'
          }
        }
      },
      {
        required: ['typeableLine'],
        errorMessage: {
          required: {
            typeableLine: 'Informe a linha digitável.'
          }
        }
      }
    ],
    errorMessage: {
      required: {
        segment: 'O campo segment é obrigatório.',
        accountId: 'O campo accountId é obrigatório.'
      },
      oneOf: 'Informe o código de barras ou a linha digitável.'
    },
    properties: {
      segment: {
        type: 'string',
        description: 'Segmento do pedido de pagamento de boleto.',
        enum: ['BOLETO_PF', 'BOLETO_PJ'],
        errorMessage: {
          enum: 'O campo segment deve ser um dos seguintes valores: BOLETO_PF, BOLETO_PJ.'
        }
      },
      accountId: {
        type: 'string',
        format: 'uuid',
        description: 'AccountId in Matera system.',
        errorMessage: {
          format: 'O campo ID da Conta precisa ser um uuid.'
        }
      },
      barcode: {
        type: 'string',
        minLength: 44,
        description: 'Barcode of the bill to be paid.',
        errorMessage: {
          minLength: 'O campo código de barras precisa ter no mínimo 44 caracteres.'
        }
      },
      typeableLine: {
        type: 'string',
        minLength: 44,
        description: 'Typeable line of the bill to be paid.',
        errorMessage: {
          minLength: 'O campo linha digitável precisa ter no mínimo 44 caracteres.'
        }
      },
      rates: {
        type: 'array',
        description: 'Array of rates to be applied.',
        items: {
          type: 'object',
          required: ['id', 'name', 'type', 'value', 'codeRate', 'codeEvent', 'historySenderCode', 'historyRecipientCode', 'coin'],
          properties: {
            id: {
              type: 'string',
              format: 'uuid',
              description: 'Rate identifier.',
              errorMessage: {
                format: 'O campo ID precisa ser um uuid.'
              }
            },
            name: {
              type: 'string',
              description: 'Name of the rate.'
            },
            value: {
              type: 'number',
              description: 'Value of the rate.'
            },
            codeRate: {
              type: 'string',
              description: 'Code of the rate.'
            },
            codeEvent: {
              type: 'string',
              description: 'Event code associated with the rate.'
            },
            historySenderCode: {
              type: 'number',
              description: "History code for the sender's transaction."
            },
            historyRecipientCode: {
              type: 'number',
              description: "History code for the recipient's transaction."
            },
            coin: {
              type: 'string',
              description: 'Currency code.',
              enum: ['BRL']
            },
            type: {
              type: 'string',
              enum: ['FIXO', 'PERCENTUAL'],
              description: 'Type of rate.'
            },
            idServiceRate: {
              type: 'string',
              format: 'uuid',
              description: 'Service Rate identifier.',
              errorMessage: {
                format: 'O campo ID Serviço Tarifa precisa ser um uuid.'
              }
            },
            idProductRate: {
              type: 'string',
              format: 'uuid',
              description: 'Product Rate identifier.',
              errorMessage: {
                format: 'O campo ID Produto Tarifa precisa ser um uuid.'
              }
            }
          },
          errorMessage: {
            required: {
              id: 'O campo id é obrigatório.',
              name: 'O campo name é obrigatório.',
              type: 'O campo type é obrigatório.',
              value: 'O campo value é obrigatório.',
              codeRate: 'O campo codeRate é obrigatório.',
              codeEvent: 'O campo codeEvent é obrigatório.',
              historySenderCode: 'O campo historySenderCode é obrigatório.',
              historyRecipientCode: 'O campo historyRecipientCode é obrigatório.',
              coin: 'O campo coin é obrigatório.'
            }
          }
        }
      }
    },
    examples: [
      {
        accountId: 'D82E75DF-2332-1E28-422C-C5FEC923E67A',
        segment: 'BOLETO_PJ',
        barcode: '23793381286006800001234567890123456780000010000',
        rates: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Tarifa de Serviço',
            type: 'FIXO',
            value: 5.0,
            codeRate: 'TAXA_ADMIN_BOLETO_PJ',
            codeEvent: 'BOLETO_PJ_PAGAMENTO',
            historySenderCode: 1001,
            historyRecipientCode: 2001,
            coin: 'BRL',
            idServiceRate: '223e4567-e89b-12d3-a456-426614174111',
            idProductRate: null
          }
        ]
      },
      {
        accountId: 'D82E75DF-2332-1E28-422C-C5FEC923E67A',
        segment: 'BOLETO_PJ',
        typeableLine: '23793381286008301352856000063307789840000150000',
        rates: [
          {
            id: '123e4567-e89b-12d3-a456-426614174000',
            name: 'Tarifa de Serviço',
            type: 'FIXO',
            value: 5.0,
            codeRate: 'TAXA_ADMIN_BOLETO_PJ',
            codeEvent: 'BOLETO_PJ_PAGAMENTO',
            historySenderCode: 1001,
            historyRecipientCode: 2001,
            coin: 'BRL',
            idServiceRate: '223e4567-e89b-12d3-a456-426614174111',
            idProductRate: null
          }
        ]
      }
    ]
  },
  response: {
    200: {
      description: 'Returned successfully.',
      type: 'object',
      properties: {
        transactionRateValue: { type: 'number', description: 'Transaction rate value.', example: 1.0 },
        totalOrderValue: { type: 'number', description: 'Total order value.', example: 5.0 },
        typeAmountAccepted: { type: 'number' },
        drawee: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            taxId: { type: 'string' }
          }
        },
        beneficiary: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            taxId: { type: 'string' }
          }
        },
        finalBeneficiary: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            taxId: { type: 'string' }
          }
        },
        details: {
          type: 'object',
          properties: {
            barcode: { type: 'string' },
            typeableLine: { type: 'string' },
            dueDate: { type: 'string', format: 'date-time' },
            faceValue: { type: 'number' },
            interest: { type: 'number' },
            fine: { type: 'number' },
            discount: { type: 'number' },
            totalAmount: { type: 'number' },
            minimumAmount: { type: 'number' },
            maximumAmount: { type: 'number' },
            consolidatedAmount: { type: 'number' },
            documentType: { type: 'string' },
            startHour: { type: 'string' },
            endHour: { type: 'string' },
            hourTimezone: { type: 'string' }
          }
        },
        financialInstitution: { type: 'string' },
        status: { type: 'string' }
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

export const CalculateBillPaymentsSchema = schema.raw;
export type CalculateBillPaymentsBodyRequest = typeof schema.types.body;
export type CalculateBillPaymentsResponse = (typeof schema.types.response)[200];
