export class PedidoBoletoHistoryEntity {
  id?: number;
  id_pedido_boleto?: number;
  descricao: string;
  id_usuario: string;
  nome_usuario: string;
  status: string;
  error?: any;
  criado_em?: Date;
}
