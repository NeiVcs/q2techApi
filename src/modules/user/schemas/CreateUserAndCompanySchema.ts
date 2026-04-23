import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const daySchema = {
  oneOf: [
    { type: 'null' },
    {
      type: 'array',
      items: { type: 'string', pattern: '^([01]\\d|2[0-3]):([0-5]\\d)$' },
      minItems: 2,
      maxItems: 2,
    }
  ],
  errorMessage: {
    type: 'Deve ser um array de horários ou null.',
    oneOf: 'O dia deve ser nulo ou um array com [início, fim].',
    minItems: 'O dia deve ter horário de início e fim.',
    maxItems: 'O dia deve ter apenas início e fim.',
    _: 'Formato inválido. Use ["HH:mm", "HH:mm"] ou null.'
  }
};

const schema = createSchema({
  description: 'Create a user and a company.',
  summary: 'Create a user and a company.',
  tags: ['User'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['user', 'company'],
    properties: {
      user: {
        type: 'object',
        required: ['name', 'password', 'taxId', 'email'],
        properties: {
          name: { type: 'string', minLength: 1, errorMessage: { minLength: 'Nome é obrigatório.' } },
          password: { type: 'string', minLength: 6, errorMessage: { minLength: 'A senha deve ter pelo menos 6 caracteres.' } },
          taxId: { type: 'string', minLength: 11, errorMessage: { minLength: 'CPF deve ter 11 dígitos.' } },
          email: { type: 'string', format: 'email', errorMessage: { format: 'E-mail inválido.' } },
          phoneNumber: { type: 'string' },
          whatsapp: { type: 'string' },
          active: { type: 'boolean', default: true },
          companyDataList: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                companyId: { type: 'string' },
                resource: { type: 'string' },
                plan: {
                  type: 'object',
                  properties: {
                    name: { type: 'string' },
                    value: { type: 'number' },
                    validate: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      },
      company: {
        type: 'object',
        required: ['name', 'description', 'url', 'minOrderPrice', 'address', 'contacts', 'stylization'],
        properties: {
          name: { type: 'string', minLength: 1 },
          description: { type: 'string', minLength: 1 },
          url: { type: 'string', minLength: 1 },
          closed: { type: 'boolean', default: false },
          alert: { type: 'string' },
          minOrderPrice: { type: 'number', minimum: 0 },
          categoriesList: {
            type: 'array',
            nullable: true,
            items: {
              type: 'object',
              required: ['name'],
              properties: {
                name: { type: 'string', minLength: 1 },
                icon: { type: 'string' }
              }
            }
          },
          stylization: {
            type: 'object',
            properties: {
              hasImage: { type: 'boolean' },
              primaryColor: { type: 'string', pattern: '^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$' },
              secondaryColor: { type: 'string' },
              logo: { type: 'string' },
              header: { type: 'string' }
            }
          },
          contacts: {
            type: 'object',
            properties: {
              phoneNumberList: { type: 'array', items: { type: 'string' } },
              whatsappNumberList: { type: 'array', items: { type: 'string' } },
              emailList: { type: 'array', items: { type: 'string', format: 'email' } }
            }
          },
          address: {
            type: 'object',
            required: ['zipCode', 'street', 'city', 'state'],
            properties: {
              zipCode: { type: 'string', minLength: 8 },
              street: { type: 'string' },
              city: { type: 'string' },
              neighborhood: { type: 'string' },
              number: { type: 'string' },
              state: { type: 'string', minLength: 2, maxLength: 2 }
            }
          },
          workSchedule: {
            type: 'object',
            minProperties: 1,
            additionalProperties: false,
            properties: {
              0: daySchema,
              1: daySchema,
              2: daySchema,
              3: daySchema,
              4: daySchema,
              5: daySchema,
              6: daySchema,
              7: daySchema
            },
            errorMessage: {
              minProperties: 'Configure ao menos um dia de funcionamento.',
              type: 'O horário deve ser um objeto.'
            }
          },
          paymentForms: { type: 'array', items: { type: 'string' } }
        }
      }
    },
    errorMessage: {
      required: {
        user: 'Os dados do usuário são obrigatórios.',
        company: 'Os dados da empresa são obrigatórios.'
      }
    }
  },
  response: {
    201: {
      description: 'Created successfully.',
      type: 'object',
      properties: {
        token: { type: 'string' }
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

export const CreateUserAndCompanySchema = schema.raw;
export type CreateUserAndCompanyBodyRequest = NonNullable<(typeof schema.types)['body']>;
export type CreateUserAndCompanyResponse = (typeof schema.types.response)[201];
