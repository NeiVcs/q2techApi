import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Create a new bill payment order request.',
  summary: 'Create a new bill payment order request.',
  tags: ['Bill Payments'],
  security: [{ ApiKeyAuth: [] }],
  headers: {
    type: 'object',
    required: ['x-idempotency-key'],
    properties: {
      'x-idempotency-key': { type: 'string', format: 'uuid', description: 'Unique identifier for this transaction.' },
      'x-api-key': { type: 'string' } //Sempre que ter outros headers é necessário colocar aqui também o x-api-key.
    },
    errorMessage: {
      required: {
        'x-idempotency-key': 'O cabeçalho x-idempotency-key é obrigatório e deve ser um UUID válido.'
      }
    }
  },
  body: {
    type: 'object',
    required: ['segment', 'entityId', 'entityAccountId', 'accountId', 'accountBranch', 'accountNumber', 'source', 'user', 'needAuthorization'],
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
    properties: {
      segment: {
        type: 'string',
        description: 'Segmento do pedido de pagamento de boleto.',
        enum: ['BOLETO_PF', 'BOLETO_PJ'],
        errorMessage: {
          required: {
            segment: 'O campo segment é obrigatório.'
          },
          enum: 'O campo segment deve ser um dos seguintes valores: BOLETO_PF, BOLETO_PJ.'
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
      },
      entityAccountId: {
        type: 'string',
        format: 'uuid',
        description: 'Account Entity ID in internal system.',
        errorMessage: {
          required: 'O campo ID da Conta da Entidade é obrigatório.',
          format: 'O campo ID da Conta da Entidade precisa ser um uuid.'
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
      accountBranch: {
        type: 'number',
        description: 'AccountBranch in Matera system.',
        errorMessage: {
          required: {
            segment: 'O campo agencia é obrigatório.'
          }
        }
      },
      accountNumber: {
        type: 'number',
        description: 'accountNumber in Matera system.',
        errorMessage: {
          required: {
            segment: 'O campo numero da conta é obrigatório.'
          }
        }
      },
      source: {
        type: 'string',
        description: 'Source system.',
        errorMessage: {
          required: 'O campo Origem é obrigatório.'
        }
      },
      reason: {
        type: 'string',
        description: 'Motivo this bill payment.'
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
      },
      needAuthorization: {
        type: 'boolean',
        description: 'Indicates if the bill payment needs authorization.',
        default: true,
        errorMessage: {
          required: 'O campo Precisa de Autorização é obrigatório.'
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
      }
    },
    errorMessage: {
      required: {
        withdrawType: 'O campo withdrawType é obrigatório.'
      },
      oneOf: 'É obrigatório informar ao menos um dos campos: código de barras ou linha digitável.'
    },
    examples: [
      {
        segment: 'BOLETO_PJ',
        entityId: '01992691-67f2-7189-bc1c-eb6a52222fdd',
        entityAccountId: 'f833d11c-39cd-4d05-b0b3-5dd7e3984850',
        accountId: '3EA489C4-DD4F-4EC9-9201-4E3F6573E86D',
        accountBranch: 1,
        accountNumber: 1234,
        source: 'SYSTEM_X',
        reason: 'Pagamento de conta de luz',
        user: {
          userId: '01992691-67f2-7189-bc1c-eb6a52222fdd',
          userName: 'João da Silva'
        },
        needAuthorization: true,
        barcode: '00190500954014481606906809350314337370000000100'
      }
    ]
  },
  response: {
    201: {
      description: 'Created successfully.',
      type: 'object',
      properties: {
        id: { type: 'string', format: 'uuid', example: '01992691-67f2-7189-bc1c-eb6a52222fdd' },
        createdAt: { type: 'string', format: 'date-time', example: '2025-06-19 10:14:09.860' }
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

export const CreateNewBillPaymentsSchema = schema.raw;
export type CreateNewBillPaymentsBodyRequest = typeof schema.types.body;
export type CreateNewBillPaymentsHeadersRequest = typeof schema.types.headers;
export type CreateNewBillPaymentsResponse = (typeof schema.types.response)[201];
