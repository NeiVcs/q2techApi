export const HistoryPedidoBoleto = {
  PENDENTE_APROVACAO: {
    description: 'Pedido pendente a aprovação.'
  },
  PEDIDO_APROVADO: {
    description: 'Pedido aprovado.'
  },
  PEDIDO_CANCELADO: {
    description: 'Pedido cancelado.'
  },
  AGUARDANDO_PAGAMENTO_TARIFA: {
    description: 'Pedido aguardando pagamento de tarifa.'
  },
  PAGAMENTO_TARIFA_REALIZADO: {
    description: 'Pagamento de tarifa do pedido realizado.'
  },
  AGUARDANDO_EXECUCAO_PAGAMENTO: {
    description: 'Aguardando execução do pagamento do pedido.'
  },
  EM_PROCESSAMENTO: {
    description: 'Em processamento do pagamento do pedido.'
  },
  PEDIDO_FINALIZADO: {
    description: 'Pedido finalizado.'
  },
  PEDIDO_FINALIZADO_ERROR: {
    description: 'Pedido finalizado com erro.'
  }
} as const;

export type HistoryPedidoBoletoKey = keyof typeof HistoryPedidoBoleto;
