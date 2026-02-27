import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a company.',
  summary: 'Query a company.',
  tags: ['Company'],
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
      required: ['id'],
      properties: {
        id: { type: 'string', description: 'id.' },
        name: { type: 'string', description: 'name.' },
        description: { type: 'string', description: 'description.' },
        url: { type: 'string', description: 'url.' },
        closed: { type: 'boolean', description: 'closed.' },
        alert: { type: 'string', description: 'alert.' },
        minOrderPrice: { type: 'string', description: 'minOrderPrice.' },
        category: {
          description: 'Lista de categorias',
          type: 'array',
          nullable: true,
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'name.' },
              icon: { type: 'string', description: 'icon.' }
            }
          }
        },
        plan: {
          description: 'Lista de adicionais',
          type: 'array',
          nullable: true,
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'name.' },
              value: { type: 'number', description: 'value.' },
              validate: { type: 'string', description: 'validate.' }
            }
          }
        },
        styles: {
          description: 'Lista de estilizações',
          type: 'object',
          properties: {
            hasImage: { type: 'boolean', description: 'hasImage.' },
            colors: {
              description: 'Lista de cores',
              type: 'object',
              properties: {
                primary: { type: 'string', description: 'primary.' },
                secondary: { type: 'string', description: 'secondary.' }
              }
            },
            images: {
              description: 'Lista de imagens',
              type: 'object',
              properties: {
                logo: { type: 'string', description: 'logo.' },
                header: { type: 'string', description: 'header.' }
              }
            }
          }
        },
        contacts: {
          description: 'Lista de contatos',
          type: 'object',
          properties: {
            phones: {
              description: 'Lista de telefones',
              type: 'array',
              nullable: true,
              items: { type: 'string' }
            },
            whatsapps: {
              description: 'Lista de whatsapps',
              type: 'array',
              nullable: true,
              items: { type: 'string' }
            },
            emails: {
              description: 'Lista de emails',
              type: 'array',
              nullable: true,
              items: { type: 'string' }
            }
          }
        },
        socialMedias: {
          description: 'Lista de medias',
          type: 'array',
          nullable: true,
          items: {
            type: 'object',
            properties: {
              name: { type: 'string', description: 'name.' },
              url: { type: 'string', description: 'url.' }
            }
          }
        },
        address: {
          type: 'object',
          properties: {
            zipCode: { type: 'string', description: 'zipCode.' },
            street: { type: 'string', description: 'street.' },
            number: { type: 'string', description: 'number.' },
            neighborhood: { type: 'string', description: 'neighborhood.' },
            city: { type: 'string', description: 'city.' },
            state: { type: 'string', description: 'state.' },
            complement: { type: 'string', description: 'complement.' }
          }
        },
        workSchedule: {
          description: 'Lista de horarios',
          type: 'array',
          nullable: true,
          items: {
            type: 'object',
            properties: {
              weekday: { type: 'string', description: 'weekday.' },
              start: { type: 'string', description: 'start.' },
              end: { type: 'string', description: 'end.' }
            }
          }
        },
        payments: {
          description: 'Lista de formas de pagamento',
          type: 'array',
          nullable: true,
          items: { type: 'string' }
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

export const FindByIdCompanySchema = schema.raw;
export type FindByIdCompanyParamsRequest = typeof schema.types.params;
export type FindByIdCompanyResponse = (typeof schema.types.response)[200];