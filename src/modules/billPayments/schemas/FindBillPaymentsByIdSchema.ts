import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Get the bill payment request by ID.',
  summary: 'Get the bill payment request by ID.',
  tags: ['Bill Payments'],
  security: [{ ApiKeyAuth: [] }],
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string',
        description: 'Id of the bill payment order.',
        errorMessage: {
          format: 'O campo ID da Conta precisa ser um uuid.'
        }
      }
    }
  },
  querystring: {
    type: 'object',
    required: ['entityId'],
    properties: {
      entityId: {
        type: 'string',
        format: 'uuid',
        description: 'Entity ID in internal system.',
        errorMessage: {
          required: 'O campo ID da Entidade é obrigatório.',
          format: 'O campo ID da Entidade precisa ser um uuid.'
        }
      }
    }
  },
  response: {
    200: {
      description: 'Returned successfully.',
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Id of the bill payment order.' },
        entityId: { type: 'string', description: 'entity Id of the bill payment order.' },
        entityAccountId: { type: 'string', description: 'entity account Id of the bill payment order.' },
        status: { type: 'string', description: 'Bill payment order status.' },
        withdrawType: {
          type: 'string',
          description: 'Withdraw type.',
          enum: ['Boleto', 'Utilities']
        },
        segment: { type: 'string', description: 'segmento of the bill payment order.' },
        billPaymentInterestsValue: { type: 'number', description: 'bill payment interests value of the bill payment order.' },
        billPaymentFineValue: { type: 'number', description: 'bill payment fine value of the bill payment order.' },
        billPaymentDiscountValue: { type: 'number', description: 'bill payment discount value of the bill payment order.' },
        billPaymentTotalValue: { type: 'number', description: 'bill payment total value of the bill payment order.' },
        billPaymentDueDate: { type: 'string', format: 'date', description: 'bill payment due date of the bill payment order.' },
        billPaymentBarcode: { type: 'string', description: 'bill payment barcode of the bill payment order.' },
        totalFeeValue: { type: 'number', description: 'Total fee amount of the bill payment order.' },
        totalOrderValue: { type: 'number', description: 'total order value of the bill payment order.' },
        feeChargeUuid: { type: 'string', description: 'fee charge uuid of the bill payment order.' },
        feeTransactionId: { type: 'string', description: 'fee transaction Id of the bill payment order.' },
        feeRefundUuid: { type: 'string', description: 'fee transaction Id of the bill payment order.' },
        paidTransactionId: { type: 'string', description: 'Paid transaction Id of the bill payment order.' },
        paidRefundTransactionId: { type: 'string', description: 'Paid refund transaction Id of the bill payment order.' },
        histories: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'number', description: 'Id of the history bill payment order.' },
              description: { type: 'string', description: 'Id history of the bill payment order.' },
              status: { type: 'string', description: 'status history of the bill payment order.' },
              error: {
                type: 'object',
                description: 'Error message if the bill payment order encountered an error.',
                properties: {
                  data: { anyOf: [{ type: 'array', items: {} }, { type: 'string' }], description: 'Data error.' }
                }
              },
              user: {
                type: 'object',
                description: 'User information.',
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
                }
              },
              createdAt: { type: 'string', format: 'date-time', description: 'Date and time the bill history was created' }
            }
          }
        },
        rates: {
          type: 'array',
          description: 'Array of rates to be applied.',
          items: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
                format: 'uuid',
                description: 'Rate identifier.'
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
                description: 'Currency code.'
              },
              type: {
                type: 'string',
                enum: ['FIXO', 'PERCENTUAL'],
                description: 'Type of rate.'
              }
            }
          }
        },
        additionalInformation: {
          type: 'object',
          description: 'Additional bill payment information.',
          properties: {
            status: {
              type: 'string',
              description: 'Bill payment status.'
            },
            typeAmountAccepted: {
              type: 'string',
              description: 'Accepted amount type.'
            },
            transactionRateValue: {
              type: 'number',
              description: 'Transaction rate value.'
            },
            drawee: {
              type: 'object',
              description: 'Drawee information.',
              properties: {
                name: { type: 'string', description: 'Drawee name.' },
                taxId: { type: 'string', description: 'Drawee tax identifier.' }
              }
            },
            beneficiary: {
              type: 'object',
              description: 'Beneficiary information.',
              properties: {
                name: { type: 'string', description: 'Beneficiary name.' },
                taxId: { type: 'string', description: 'Beneficiary tax identifier.' }
              }
            },
            finalBeneficiary: {
              type: 'object',
              description: 'Final beneficiary information.',
              properties: {
                name: { type: 'string', description: 'Final beneficiary name.' },
                taxId: { type: 'string', description: 'Final beneficiary tax identifier.' }
              }
            },
            details: {
              type: 'object',
              description: 'Bill payment details.',
              properties: {
                barcode: { type: 'string' },
                typeableLine: { type: 'string' },
                documentType: { type: 'string' },
                dueDate: { type: 'string', format: 'date' },

                startHour: { type: 'string' },
                endHour: { type: 'string' },
                hourTimezone: { type: 'string' },
                financialInstitution: { type: 'string' },

                faceValue: { type: 'number' },
                totalAmount: { type: 'number' },
                consolidatedAmount: { type: 'number' },
                minimumAmount: { type: 'number' },
                maximumAmount: { type: 'number' },

                fine: { type: 'number' },
                interest: { type: 'number' },
                discount: { type: 'number' }
              }
            }
          }
        },
        updatedAt: { type: 'string', format: 'date-time', description: 'Date and time the payment request for the bill was updated.' },
        createdAt: { type: 'string', format: 'date-time', description: 'Date and time the payment request for the bill was created.' }
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

export const FindBillPaymentsByIdSchema = schema.raw;
export type FindBillPaymentsByIdParamsRequest = typeof schema.types.params;
export type FindBillPaymentsByIdQueryRequest = typeof schema.types.querystring;
export type FindBillPaymentsByIdResponse = (typeof schema.types.response)[200];
