import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a user.',
  summary: 'Query a user.',
  tags: ['User'],
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
      properties: {
        id: { type: 'string', description: 'ID do usuário.' },
        name: { type: 'string', description: 'Nome completo.' },
        email: { type: 'string', description: 'E-mail cadastrado.' },
        taxId: { type: 'string', description: 'CPF formatado.' },
        phoneNumber: { type: 'string', description: 'Telefone.' },
        whatsapp: { type: 'string', description: 'WhatsApp.' },
        position: { type: 'string', description: 'Cargo ocupado.' },
        resource: { type: 'string', description: 'Nível de permissão.' },
        active: { type: 'boolean', description: 'Status da conta.' },
        address: {
          type: 'object',
          properties: {
            zipCode: { type: 'string' },
            street: { type: 'string' },
            number: { type: 'string' },
            neighborhood: { type: 'string' },
            city: { type: 'string' },
            state: { type: 'string' },
            complement: { type: 'string' }
          }
        },
        companyDataList: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              companyId: { type: 'string', description: 'Id da empresa vinculada.' },
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

export const FindByIdUserSchema = schema.raw;
export type FindByIdUserParamsRequest = typeof schema.types.params;
export type FindByIdUserResponse = (typeof schema.types.response)[200];
