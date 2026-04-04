import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Create a company.',
  summary: 'Create a company.',
  tags: ['Company'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['name', 'description', 'url', 'minOrderPrice', 'address', 'contacts', 'stylization'],
    properties: {
      name: {
        type: 'string',
        description: 'name',
        minLength: 1,
        errorMessage: {
          minLength: 'Nome deve ter pelo menos 1 caractere.'
        }
      },
      description: {
        type: 'string',
        description: 'name',
        minLength: 1,
        errorMessage: {
          minLength: 'Descrição deve ter pelo menos 1 caractere.'
        }
      },
      url: {
        type: 'string',
        description: 'url',
        minLength: 1,
        errorMessage: {
          minLength: 'Url deve ter pelo menos 1 caractere.'
        }
      },
      closed: {
        type: 'boolean',
        description: 'closed',
      },
      alert: {
        type: 'string',
        description: 'alert',
      },
      minOrderPrice: {
        type: 'number',
        description: 'mínimo.',
        minimum: 0,
        errorMessage: {
          type: 'Valor mínimo deve ser um número.',
          minimum: 'Valor mínimo deve ser maior que 0.'
        }
      },
      categoriesList: {
        type: 'array',
        nullable: true,
        items: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              minLength: 1,
              errorMessage: { minLength: 'O nome da categoria é obrigatório.' }
            },
            icon: { type: 'string' }
          }
        }
      },
      plan: {
        type: 'array',
        nullable: true,
        items: {
          type: 'object',
          required: ['name', 'value'],
          properties: {
            name: {
              type: 'string',
              minLength: 1,
              errorMessage: { minLength: 'O nome do plano é obrigatório.' }
            },
            value: {
              type: 'number',
              minimum: 0,
              errorMessage: { minimum: 'O valor do plano não pode ser negativo.' }
            },
            validate: { type: 'string' }
          }
        }
      },
      stylization: {
        type: 'object',
        properties: {
          hasImage: { type: 'boolean' },
          primaryColor: {
            type: 'string',
            pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$',
            errorMessage: { pattern: 'A cor primária deve ser um hexadecimal válido (ex: #FFFFFF).' }
          },
          secondaryColor: { type: 'string' },
          logo: { type: 'string' },
          header: { type: 'string' }
        }
      },
      contacts: {
        type: 'object',
        properties: {
          phoneNumberList: { type: 'array', items: { type: 'string' }, nullable: true },
          whatsappNumberList: { type: 'array', items: { type: 'string' }, nullable: true },
          emailList: {
            type: 'array',
            nullable: true,
            items: {
              type: 'string',
              format: 'email',
              errorMessage: { format: 'Formato de e-mail inválido.' }
            }
          }
        }
      },
      address: {
        type: 'object',
        required: ['zipCode', 'street', 'city', 'state'],
        properties: {
          zipCode: {
            type: 'string',
            minLength: 8,
            errorMessage: { minLength: 'CEP inválido.' }
          },
          street: { type: 'string', minLength: 1 },
          number: { type: 'string' },
          neighborhood: { type: 'string' },
          city: { type: 'string', minLength: 1 },
          state: { type: 'string', minLength: 2, maxLength: 2 },
          complement: { type: 'string' }
        }
      },
      workSchedule: {
        type: 'object',
        minProperties: 1,
        additionalProperties: false,
        properties: {
          0: {
            oneOf: [
              { type: 'null' },
              {
                type: 'array',
                items: { type: 'string', pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$' },
                nullable: true,
                minItems: 2,
                maxItems: 2,
              }
            ],
            errorMessage: {
              type: 'Deve ser um array de horários ou null.',
              oneOf: 'O dia deve ser nulo ou um array com exatamente 2 horários.',
              minItems: 'O dia deve ter horário de início e fim.',
              maxItems: 'O dia deve ter apenas início e fim.',
              _: 'Formato inválido para o dia. Envie um array [início, fim] ou null.'
            }
          },
          1: {
            oneOf: [
              { type: 'null' },
              {
                type: 'array',
                items: { type: 'string', pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$' },
                nullable: true,
                minItems: 2,
                maxItems: 2,
              }
            ],
            errorMessage: {
              type: 'Deve ser um array de horários ou null.',
              oneOf: 'O dia deve ser nulo ou um array com exatamente 2 horários.',
              minItems: 'O dia deve ter horário de início e fim.',
              maxItems: 'O dia deve ter apenas início e fim.',
              _: 'Formato inválido para o dia. Envie um array [início, fim] ou null.'
            }
          },
          2: {
            oneOf: [
              { type: 'null' },
              {
                type: 'array',
                items: { type: 'string', pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$' },
                nullable: true,
                minItems: 2,
                maxItems: 2,
              }
            ],
            errorMessage: {
              type: 'Deve ser um array de horários ou null.',
              oneOf: 'O dia deve ser nulo ou um array com exatamente 2 horários.',
              minItems: 'O dia deve ter horário de início e fim.',
              maxItems: 'O dia deve ter apenas início e fim.',
              _: 'Formato inválido para o dia. Envie um array [início, fim] ou null.'
            }
          },
          3: {
            oneOf: [
              { type: 'null' },
              {
                type: 'array',
                items: { type: 'string', pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$' },
                nullable: true,
                minItems: 2,
                maxItems: 2,
              }
            ],
            errorMessage: {
              type: 'Deve ser um array de horários ou null.',
              oneOf: 'O dia deve ser nulo ou um array com exatamente 2 horários.',
              minItems: 'O dia deve ter horário de início e fim.',
              maxItems: 'O dia deve ter apenas início e fim.',
              _: 'Formato inválido para o dia. Envie um array [início, fim] ou null.'
            }
          },
          4: {
            oneOf: [
              { type: 'null' },
              {
                type: 'array',
                items: { type: 'string', pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$' },
                nullable: true,
                minItems: 2,
                maxItems: 2,
              }
            ],
            errorMessage: {
              type: 'Deve ser um array de horários ou null.',
              oneOf: 'O dia deve ser nulo ou um array com exatamente 2 horários.',
              minItems: 'O dia deve ter horário de início e fim.',
              maxItems: 'O dia deve ter apenas início e fim.',
              _: 'Formato inválido para o dia. Envie um array [início, fim] ou null.'
            }
          },
          5: {
            oneOf: [
              { type: 'null' },
              {
                type: 'array',
                items: { type: 'string', pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$' },
                nullable: true,
                minItems: 2,
                maxItems: 2,
              }
            ],
            errorMessage: {
              type: 'Deve ser um array de horários ou null.',
              oneOf: 'O dia deve ser nulo ou um array com exatamente 2 horários.',
              minItems: 'O dia deve ter horário de início e fim.',
              maxItems: 'O dia deve ter apenas início e fim.',
              _: 'Formato inválido para o dia. Envie um array [início, fim] ou null.'
            }
          },
          6: {
            oneOf: [
              { type: 'null' },
              {
                type: 'array',
                items: { type: 'string', pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$' },
                nullable: true,
                minItems: 2,
                maxItems: 2,
              }
            ],
            errorMessage: {
              type: 'Deve ser um array de horários ou null.',
              oneOf: 'O dia deve ser nulo ou um array com exatamente 2 horários.',
              minItems: 'O dia deve ter horário de início e fim.',
              maxItems: 'O dia deve ter apenas início e fim.',
              _: 'Formato inválido para o dia. Envie um array [início, fim] ou null.'
            }
          },
          7: {
            oneOf: [
              { type: 'null' },
              {
                type: 'array',
                items: { type: 'string', pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$' },
                nullable: true,
                minItems: 2,
                maxItems: 2,
              }
            ],
            errorMessage: {
              type: 'Deve ser um array de horários ou null.',
              oneOf: 'O dia deve ser nulo ou um array com exatamente 2 horários.',
              minItems: 'O dia deve ter horário de início e fim.',
              maxItems: 'O dia deve ter apenas início e fim.',
              _: 'Formato inválido para o dia. Envie um array [início, fim] ou null.'
            }
          },
        },
        errorMessage: {
          minProperties: 'É necessário configurar o horário de ao menos um dia.',
          type: 'O horário de trabalho deve ser um objeto.'
        }
      },
      paymentForms: {
        type: 'array',
        nullable: true,
        items: { type: 'string', minLength: 1 }
      }
    },
    errorMessage: {
      required: {
        companyId: 'Id da loja é um campo obrigatório',
        name: 'Nome é um campo obrigatório.',
        category: 'Categoria é um campo obrigatório.',
        isAdditional: 'Apenas adicional é um campo obrigatório.',
        description: 'Descrição é um campo obrigatório.',
        price: 'Preço é um campo obrigatório.',
      }
    },
    examples: [
      {
        name: 'Lanchonete do Dev',
        description: 'O melhor hambúrguer codado da região',
        url: 'lanchonete-do-dev',
        closed: false,
        alert: 'Estamos aceitando apenas Pix hoje!',
        minOrderPrice: 30.00,
        categoriesList: [
          { name: 'Hambúrgueres', icon: 'burger-icon' },
          { name: 'Bebidas', icon: 'soda-icon' }
        ],
        plan: [
          { name: 'Premium', value: 99.90, validate: '2026-12-31' }
        ],
        stylization: {
          hasImage: true,
          primaryColor: '#FF0000',
          secondaryColor: '#000000',
          logo: 'https://cdn.image.com/logo.png',
          header: 'https://cdn.image.com/header.png'
        },
        contacts: {
          phoneNumberList: ['11999999999'],
          whatsappNumberList: ['11988888888'],
          emailList: ['contato@devburger.com']
        },
        address: {
          zipCode: '01234567',
          street: 'Avenida da Tecnologia',
          number: '1024',
          neighborhood: 'Bairro Binário',
          city: 'São Paulo',
          state: 'SP',
          complement: 'Bloco A'
        },
        workSchedule: {
          0: ['17:00', '22:00'],
          1: null,
          2: ['17:00', '22:00'],
          3: ['17:00', '22:00'],
          4: ['17:00', '22:00'],
          5: ['17:00', '22:00'],
          6: ['17:00', '22:00'],
          7: ['17:00', '22:00'],
        },
        paymentForms: ['Pix', 'Cartão de Crédito', 'Dinheiro']
      }
    ]
  },
  response: {
    201: {
      description: 'Created successfully.',
      type: 'object',
      properties: {
        id: { type: 'string', format: 'mongoId', example: '65f1a2b3c4d5e6f7a8b9c0d1' }
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

export const CreateCompanySchema = schema.raw;
export type CreateCompanyBodyRequest = typeof schema.types.body;
export type CreateCompanyResponse = (typeof schema.types.response)[201];
