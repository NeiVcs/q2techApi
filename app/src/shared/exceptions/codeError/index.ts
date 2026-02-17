export const CodeErrors = {
  CODE_ERROR_SERVER_INTERNAL_ERROR: {
    code: 'SERVER_INTERNAL_ERROR',
    message: 'Internal error in service'
  },
  CODE_ERROR_SERVICE_UNAVAILABLE: {
    code: 'SERVICE_UNAVAILABLE',
    message: 'Service Unavailable'
  },
  CODE_ERROR_UNAUTHORIZED: {
    code: 'UNAUTHORIZED',
    message: 'Não Autorizado'
  },
  CODE_ERROR_ACCESS_DENIED: {
    code: 'ACCESS_DENIED',
    message: 'Acesso Negado'
  },
  CODE_ERROR_FIELDS_INVALID: {
    code: 'INVALID_FIELDS',
    message: 'Os campos inválidos/obrigatórios'
  },
  CODE_ERROR_NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Route not found'
  },
  CODE_ERROR_RESOURCE_NOT_FOUND: {
    code: 'RESOURCE_NOT_FOUND',
    message: 'Resource not found'
  },
  CODE_ERROR_RESOURCE_ALREADY_EXISTS: {
    code: 'RESOURCE_ALREADY_EXISTS',
    message: 'Já existe um registro cadastrado com estes dados.'
  },
  CODE_ERROR_SERVICE_BOLETO_PJ_INVALID: {
    code: 'SERVICE_BOLETO_PJ_INVALID',
    message: 'A empresa não possui o serviço de pagamento de boleto para realizar esta operação.'
  },
  CODE_ERROR_CODE_BAR_BILL_PAYMENTS_ORDER_NOT_FOUND: {
    code: 'CODE_BAR_BILL_PAYMENTS_ORDER_NOT_FOUND',
    message: 'Dados da fatura não encontrados para o código de barras fornecido.'
  },
  CODE_ERROR_BILL_PAYMENTS_ORDER_NOT_FOUND: {
    code: 'BILL_PAYMENTS_ORDER_NOT_FOUND',
    message: 'Pedido de pagamento de boleto não encontrado.'
  },
  CODE_ERROR_PEDIDO_BOLETO_FINISHED: {
    code: 'PEDIDO_BOLETO_FINISHED',
    message: 'O pedido de boleto já foi finalizado e não pode ser alterado.'
  },
  CODE_ERROR_PEDIDO_BOLETO_IN_PROCESSING: {
    code: 'PEDIDO_BOLETO_IN_PROCESSING',
    message: 'Seu pedido de boleto está em processamento, por favor aguarde.'
  },
  CODE_ERROR_PEDIDO_BOLETO_NOT_CANCELLED: {
    code: 'PEDIDO_BOLETO_NOT_CANCELLED',
    message: 'Não é possível cancelar o seu pedido de boleto, pois ele já foi aprovado sem cobrança de tarifa e encontra-se em processamento.'
  },
  CODE_ERROR_PEDIDO_BOLETO_CANCELLED: {
    code: 'PEDIDO_BOLETO_CANCELLED',
    message: 'Seu pedido de boleto está cancelado.'
  },
  CODE_ERROR_PEDIDO_BOLETO_APPROVED: {
    code: 'PEDIDO_BOLETO_APPROVED',
    message: 'Seu pedido de boleto já foi aprovado.'
  },
  CODE_ERROR_PEDIDO_BOLETO_PENDING_APPROVED: {
    code: 'PEDIDO_BOLETO_PENDING_APPROVED',
    message: 'Seu pedido de boleto precisa estar com o status como pendente de aprovação.'
  },
  CODE_ERROR_PEDIDO_BOLETO_NEED_APPROVED: {
    code: 'PEDIDO_BOLETO_NEED_APPROVED',
    message: 'Seu pedido de boleto precisa estar aprovado.'
  },
  CODE_ERROR_PEDIDO_BOLETO_FEE_NOT_PAID: {
    code: 'PEDIDO_BOLETO_FEE_NOT_PAID',
    message: 'Seu pedido de boleto precisa estar com tarifa paga antes de realizar o pagamento do boleto.'
  },
  CODE_ERROR_PEDIDO_BOLETO_PAYMENT_FAILED: {
    code: 'PEDIDO_BOLETO_PAYMENT_FAILED',
    message: 'Ocorreu um erro e não foi possível realizar o pagamento do boleto.'
  }
} as const;
