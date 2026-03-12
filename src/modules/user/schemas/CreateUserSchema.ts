import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Create a user.',
  summary: 'Create a user.',
  tags: ['User'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['name', 'password', 'taxId', 'email', 'address'],
    properties: {
      name: {
        type: 'string',
        minLength: 1,
        errorMessage: { minLength: 'Nome é obrigatório.' }
      },
      password: {
        type: 'string',
        minLength: 6,
        errorMessage: { minLength: 'A senha deve ter pelo menos 6 caracteres.' }
      },
      taxId: {
        type: 'string',
        minLength: 11,
        errorMessage: { minLength: 'CPF deve ter 11 digitos' }
      },
      email: {
        type: 'string',
        format: 'email',
        errorMessage: { format: 'Formato de e-mail inválido.' }
      },
      phoneNumber: { type: 'string' },
      whatsapp: { type: 'string' },
      active: { type: 'boolean', default: true },
      address: {
        type: 'object',
        required: ['zipCode', 'street', 'city', 'state'],
        properties: {
          zipCode: { type: 'string', minLength: 8 },
          street: { type: 'string' },
          number: { type: 'string' },
          neighborhood: { type: 'string' },
          city: { type: 'string' },
          state: { type: 'string', minLength: 2, maxLength: 2 },
          complement: { type: 'string' }
        }
      },
      companyDataList: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            companyId: { type: 'string', description: 'Id da empresa vinculada.' },
            resource: { type: 'string', description: 'Nível de acesso (ex: admin)' },
            plan: {
              type: 'object',
              properties: {
                name: { type: 'string' },
                value: { type: 'number' },
                validate: { type: 'string' }
              }
            },
            billing: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  dueDate: { type: 'string' },
                  value: { type: 'number' },
                  status: { type: 'string' }
                }
              }
            }
          }
        }
      },
      lastLogin: { type: 'string', format: 'date-time' },
      createdAt: { type: 'string', format: 'date-time' }
    },
    errorMessage: {
      required: {
        name: 'Nome é um campo obrigatório.',
        password: 'Senha é um campo obrigatório.',
        taxId: 'CPF é um campo obrigatório.',
        email: 'E-mail é um campo obrigatório.',
        resource: 'Nível de acesso é um campo obrigatório.',
        address: 'Endereço é um campo obrigatório.'
      }
    },
    examples: [
      {
        name: 'João Silva',
        password: 'senha123',
        taxId: '123.456.789-00',
        email: 'email@email.com',
        phoneNumber: '11987654321',
        whatsapp: '11987654321',
        address: {
          zipCode: '01234567',
          street: 'Avenida da Tecnologia',
          number: '1024',
          neighborhood: 'Bairro Binário',
          city: 'São Paulo',
          state: 'SP'
        },
        companyDataList: [
          {
            companyId: '123456789',
            resource: 'admin',
            active: true,
            plan: {
              name: 'Premium',
              value: 99.9,
              validate: '2026-12-31'
            },
            billing: [
              {
                dueDate: '2024-07-01',
                value: 99.9,
                status: 'pending'
              }
            ]
          }
        ],
        active: true,
        lastLogin: '2026-03-02 08:00',
        createdAt: '2026-03-02'
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

export const CreateUserSchema = schema.raw;
export type CreateUserBodyRequest = typeof schema.types.body;
export type CreateUserResponse = (typeof schema.types.response)[201];
