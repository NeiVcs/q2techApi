import { DefinitionsExceptionSchema } from '@shared/exceptions';
import { createSchema } from '@shared/schemas/define';

const schema = createSchema({
  description: 'Create a order.',
  summary: 'Create a order.',
  tags: ['Order'],
  security: [{ ApiKeyAuth: [] }],
  body: {
    type: 'object',
    required: ['companyId', 'paymentForm', 'totalPrice', 'deliveryMode', 'userData', 'orderData'],
    properties: {
      companyId: {
        type: 'string',
        description: 'ID da empresa (MongoID)',
        minLength: 1,
        errorMessage: { minLength: 'O ID da empresa é obrigatório.' }
      },
      paymentForm: {
        type: 'string',
        description: 'Forma de pagamento escolhida',
        minLength: 1,
        errorMessage: { minLength: 'A forma de pagamento deve ser informada.' }
      },
      totalPrice: {
        type: 'number',
        description: 'Valor total do pedido',
        minimum: 0,
        errorMessage: { minimum: 'O valor total não pode ser negativo.' }
      },
      payedPrice: {
        type: 'number',
        description: 'Valor entregue pelo cliente',
        minimum: 0,
        errorMessage: { minimum: 'O valor pago não pode ser negativo.' }
      },
      change: {
        type: 'number',
        description: 'Valor do troco',
        minimum: 0,
        errorMessage: { minimum: 'O troco não pode ser negativo.' }
      },
      deliveryMode: {
        type: 'string',
        description: 'Modo de entrega (Delivery/Retirada)',
        minLength: 1,
        errorMessage: { minLength: 'O modo de entrega é obrigatório.' }
      },
      rating: {
        type: 'number',
        minimum: 0,
        maximum: 5,
        description: 'Nota do pedido pelo cliente',
        errorMessage: { minimum: 'Mínimo 0.', maximum: 'Máximo 5.' }
      },
      notification: { type: 'string', description: 'Token para notificações push', nullable: true },
      userData: {
        type: 'object',
        description: 'Dados do cliente',
        required: ['name', 'phoneNumber', 'address'],
        properties: {
          name: {
            type: 'string',
            description: 'Nome do cliente',
            minLength: 1,
            errorMessage: { minLength: 'Nome do cliente é obrigatório.' }
          },
          phoneNumber: {
            type: 'string',
            description: 'Telefone de contato',
            minLength: 8,
            errorMessage: { minLength: 'Telefone inválido.' }
          },
          address: {
            type: 'object',
            description: 'Endereço de entrega',
            required: ['zipCode', 'street', 'number', 'neighborhood', 'city', 'state'],
            properties: {
              zipCode: {
                type: 'string',
                minLength: 8,
                description: 'CEP',
                errorMessage: { minLength: 'CEP deve ter pelo menos 8 dígitos.' }
              },
              street: { type: 'string', description: 'Logradouro', minLength: 1 },
              number: { type: 'string', description: 'Número da residência', minLength: 1 },
              neighborhood: { type: 'string', description: 'Bairro', minLength: 1 },
              city: { type: 'string', description: 'Cidade', minLength: 1 },
              state: {
                type: 'string',
                description: 'UF (Sigla)',
                minLength: 2,
                maxLength: 2,
                errorMessage: { minLength: 'Use a sigla do estado (ex: SP).', maxLength: 'Use a sigla do estado (ex: SP).' }
              },
              complement: { type: 'string', description: 'Complemento', nullable: true },
              reference: { type: 'string', description: 'Ponto de referência', nullable: true }
            }
          }
        }
      }
    },
    errorMessage: {
      required: {
        companyId: 'O campo companyId é obrigatório.',
        paymentForm: 'O campo paymentForm é obrigatório.',
        totalPrice: 'O campo totalPrice é obrigatório.',
        deliveryMode: 'O campo deliveryMode é obrigatório.',
        userData: 'Dados do usuário são obrigatórios.',
        orderData: 'Dados do pedido são obrigatórios.'
      }
    },
    examples: [
      {
        companyId: '65f1a2b3c4d5e6f7a8b9c0d1',
        paymentForm: 'Cartão de Crédito',
        totalPrice: 85.90,
        payedPrice: 85.90,
        change: 0.00,
        deliveryMode: 'DELIVERY',
        rating: 5,
        notification: 'Atraso por falta de entregadores',
        userData: {
          name: 'faminto',
          phoneNumber: '11988887777',
          address: {
            zipCode: '01234567',
            street: 'Rua do Código',
            number: '404',
            neighborhood: 'Bairro Sem Bug',
            city: 'São Paulo',
            state: 'SP',
            complement: 'Bloco C, Apto 12',
            reference: 'Próximo à padaria central'
          }
        },
        orderData: [
          {
            productId: '12345677890987654',
            name: 'Pizza 8 pedaços',
            quantity: 1,
            price: 45.00,
            observation: 'Bem assada',
            additional: [
              {
                additionalId: '13413424234324234',
                name: 'Pizza de Calabresa',
                quantity: 1,
                price: 45.00
              }
            ]
          }
        ]
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

export const CreateOrderSchema = schema.raw;
export type CreateOrderBodyRequest = typeof schema.types.body;
export type CreateOrderResponse = (typeof schema.types.response)[201];
