import { OrderBillPaymentsStatusEnum } from '@modules/billPayments/enum/OrderBillPaymentsStatusEnum';

export class PedidoBoletoEntity {
  id?: number;
  uuid: string;
  id_entidade: string;
  id_entidade_conta: string;
  id_conta_matera: string;
  numero_agencia: number;
  numero_conta: number;
  precisa_autorizacao: boolean;
  status: OrderBillPaymentsStatusEnum;
  tipo_pagamento: string;
  cpf_cnpj_beneficiario?: string;
  origem: string;
  segmento: string;
  valor_juros_boleto: number;
  valor_multa_boleto: number;
  valor_desconto_boleto: number;
  valor_total_boleto: number;
  data_vencimento_boleto: string;
  codigo_barra_boleto: string;
  linha_digitavel_boleto: string;
  valor_tarifa_bepay: number;
  valor_total_pedido: number;
  id_transacao_pagamento?: string;
  id_transacao_pagamento_estorno?: string;
  id_transacao_tarifa?: string;
  uuid_tarifa_cobranca: string;
  uuid_tarifa_estorno?: string;
  id_transacao_tarifa_estorno?: string;
  reason?: string;
  error?: any;
  atualizado_em?: Date;
  criado_em?: Date;
}
