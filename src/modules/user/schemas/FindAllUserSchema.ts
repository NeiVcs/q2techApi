import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a list of users.',
  summary: 'Query a list of users.',
  tags: ['User'],
  security: [{ ApiKeyAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      page: {
        type: 'number',
        description: 'Página atual',
        minimum: 1,
        errorMessage: {
          minimum: 'A página deve ser maior que 0.'
        }
      },
      pageSize: {
        type: 'number',
        description: 'Quantidade de itens por página',
        minimum: 1,
        errorMessage: {
          minimum: 'O tamanho da página deve ser maior que 0.'
        }
      },
      companyId: {
        type: 'string',
        description: 'Filtrar usuários por ID da empresa'
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
            page: { type: 'number', description: 'Página atual.' },
            pageSize: { type: 'number', description: 'Itens por página.' },
            total: { type: 'number', description: 'Total de usuários encontrados.' },
          },
        },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'ID do usuário.' },
              name: { type: 'string', description: 'Nome completo.' },
              email: { type: 'string', description: 'E-mail cadastrado.' },
              taxId: { type: 'string', description: 'CPF formatado.' },
              phoneNumber: { type: 'string', description: 'Telefone.' },
              whatsapp: { type: 'string', description: 'WhatsApp.' },
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
                    resource: { type: 'string', description: 'Nível de permissão.' },
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
          }
        }
      }
    },
    400: DefinitionsExceptionSchema.Error400,
    401: DefinitionsExceptionSchema.Error401,
    403: DefinitionsExceptionSchema.Error403,
    404: DefinitionsExceptionSchema.Error404,
    500: DefinitionsExceptionSchema.Error500
  }
});

export const FindAllUserSchema = schema.raw;
export type FindAllUserQueryRequest = typeof schema.types.querystring;
export type FindAllUserResponse = (typeof schema.types.response)[200];