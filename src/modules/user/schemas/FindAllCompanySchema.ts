import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Query a list of company.',
  summary: 'Query a list of company.',
  tags: ['Company'],
  security: [{ ApiKeyAuth: [] }],
  querystring: {
    type: 'object',
    properties: {
      page: {
        type: 'number',
        description: 'page',
        minimum: 1,
        errorMessage: {
          minimum: 'A página deve ser maior que 0.'
        }
      },
      pageSize: {
        type: 'number',
        description: 'page size',
        minimum: 1,
        errorMessage: {
          minimum: 'O tamanho da página deve ser maior que 0.'
        }
      },
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
            page: { type: 'number', description: 'page.' },
            pageSize: { type: 'number', description: 'page size.' },
            total: { type: 'number', description: 'total.' },
          },
        },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string', description: 'id.' },
              name: { type: 'string', description: 'name.' },
              description: { type: 'string', description: 'description.' },
              url: { type: 'string', description: 'url.' },
              closed: { type: 'boolean', description: 'closed.' },
              minOrderPrice: { type: 'number', description: 'minOrderPrice.' },
              categoriesList: {
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
              stylization: {
                description: 'Lista de estilizações',
                type: 'object',
                properties: {
                  hasImage: { type: 'boolean', description: 'hasImage.' },
                  primaryColor: { type: 'string', description: 'primary.' },
                  secondaryColor: { type: 'string', description: 'secondary.' },
                  logo: { type: 'string', description: 'logo.' },
                  header: { type: 'string', description: 'header.' }
                }
              },
              contacts: {
                description: 'Lista de contatos',
                type: 'object',
                properties: {
                  phoneNumberList: {
                    description: 'Lista de telefones',
                    type: 'array',
                    nullable: true,
                    items: { type: 'string' }
                  },
                  whatsappNumberList: {
                    description: 'Lista de whatsapps',
                    type: 'array',
                    nullable: true,
                    items: { type: 'string' }
                  },
                  emailList: {
                    description: 'Lista de emails',
                    type: 'array',
                    nullable: true,
                    items: { type: 'string' }
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
              paymentForms: {
                description: 'Lista de formas de pagamento',
                type: 'array',
                nullable: true,
                items: { type: 'string' }
              }
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

export const FindAllCompanySchema = schema.raw;
export type FindAllCompanyQueryRequest = typeof schema.types.querystring;
export type FindAllCompanyResponse = (typeof schema.types.response)[200];
