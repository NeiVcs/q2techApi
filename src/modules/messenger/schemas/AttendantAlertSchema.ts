import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Send WhatsApp message.',
  summary: 'Send WhatsApp message',
  tags: ['Messenger'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['table', 'company'],
    properties: {
      table: {
        type: 'string',
        description: 'Mesa.',
        errorMessage: {
          type: 'O campo "number" deve ser uma string.',
          minLength: 'O número de telefone deve conter no mínimo 10 dígitos.'
        }
      },
      company: {
        type: 'string',
        description: 'Loja.',
        minLength: 1,
        errorMessage: {
          type: 'O campo "company" deve ser uma string.',
          minLength: 'A mensagem não pode estar vazia.'
        }
      },
    }
  },
  response: {
    200: {
      description: 'Estamos enviando um atendente.',
      type: 'object',
      properties: {
        message: { type: 'string', description: 'Mensagem de confirmação' }
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

export const AttendantAlertSchema = schema.raw;
export type AttendantAlertBodyRequest = typeof schema.types.body;
export type AttendantAlertResponse = (typeof schema.types.response)[200];
