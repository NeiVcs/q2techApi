export class PedidoBoletoTarifaEntity {
  id?: number;
  uuid: string;
  id_pedido_boleto: number;
  id_tarifa: string;
  id_servico_tarifa?: string;
  id_produto_tarifa?: string;
  nome_tarifa: string;
  tipo_tarifa: string;
  codigo_tarifa: string;
  codigo_evento: string;
  moeda: string;
  valor: number;
  codigo_historico_envio: number;
  codigo_historico_recebimento: number;
  criado_em?: Date;
}
