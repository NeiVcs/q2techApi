import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Envia uma mensagem via WhatsApp para um número ou grupo.',
  summary: 'Enviar mensagem no WhatsApp',
  tags: ['WhatsApp'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['number', 'message'],
    properties: {
      number: {
        type: 'string',
        description: 'Número de telefone com DDD (somente números).',
        minLength: 10,
        errorMessage: {
          type: 'O campo "number" deve ser uma string.',
          minLength: 'O número de telefone deve conter no mínimo 10 dígitos.'
        }
      },
      message: {
        type: 'string',
        description: 'Texto da mensagem a ser enviada.',
        minLength: 1,
        errorMessage: {
          type: 'O campo "message" deve ser uma string.',
          minLength: 'A mensagem não pode estar vazia.'
        }
      },
    }
  },
  response: {
    200: {
      description: 'Mensagem enviada com sucesso.',
      type: 'object',
      properties: {
        success: { type: 'boolean', description: 'Status do envio' },
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

export const WhatsAppMessengerSchema = schema.raw;
export type WhatsAppMessengerRequest = typeof schema.types.body;
export type WhatsAppMessengerResponse = (typeof schema.types.response)[200];