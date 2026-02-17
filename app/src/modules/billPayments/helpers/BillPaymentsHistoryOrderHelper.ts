import { CreateBillPaymentsHistoryOrderDto } from '../dto/CreateBillPaymentsHistoryOrderDto';
import { CreateNewBillPaymentsUserDTO } from '../dto/CreateNewBillPaymentsUserDTO';
import { PedidoBoletoHistoryEntity } from '../repositories/entities/PedidoBoletoHistoryEntity';
import { HistoryPedidoBoleto, HistoryPedidoBoletoKey } from '../enum/HistoryPedidoBoletoEnum';
import { BaseAbstractException } from '@shared/exceptions';

export class BillPaymentsHistoryOrderHelper {
  protected static DEFAULT_USER_NAME = 'MS_BOLETO';

  public static async addBillPaymentsHistoryOrder(status: HistoryPedidoBoletoKey, user?: CreateNewBillPaymentsUserDTO): Promise<CreateBillPaymentsHistoryOrderDto> {
    const stepData = HistoryPedidoBoleto[status];
    if (!stepData) {
      throw new Error(`Status "${status}" não encontrado em HistoryPedidoBoleto`);
    }

    return {
      status: status,
      description: stepData.description,
      user: {
        userId: user?.userId || this.DEFAULT_USER_NAME,
        userName: user?.userName || this.DEFAULT_USER_NAME
      },
      createdAt: new Date()
    };
  }

  public static addBillPaymentsHistoryOrderEntity(status: HistoryPedidoBoletoKey, user?: { userId: string; userName: string }, error?: any): PedidoBoletoHistoryEntity {
    const stepData = HistoryPedidoBoleto[status];
    if (!stepData) {
      throw new Error(`Status "${status}" não encontrado em HistoryPedidoBoleto`);
    }

    return {
      status: status,
      descricao: stepData.description,
      id_usuario: user?.userId || this.DEFAULT_USER_NAME,
      nome_usuario: user?.userName || this.DEFAULT_USER_NAME,
      error: this.buildErrorHistory(error),
      criado_em: new Date()
    };
  }

  private static buildErrorHistory(error?: any) {
    if (!error) {
      return undefined;
    }

    if (error instanceof BaseAbstractException) {
      return JSON.stringify({ data: JSON.parse(error.message) });
    }

    return JSON.stringify({ data: error?.message || 'Erro inesperado. Entre em contato com o suporte técnico para obter assistência.' });
  }
}
