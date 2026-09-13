import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { FindTablesOrderParamsRequest, FindTablesOrderResponse } from '@modules/order/schemas/FindTablesOrderSchema'
import { FindTablesOrderInputDTO } from "@modules/order/dto/FindTablesOrderInputDTO";
import { FindTablesOrderOutputDTO } from "@modules/order/dto/FindTablesOrderOutputDTO";
import { OrderDTO } from '../dto/OrderDTO';

@singleton()
export class FindTablesOrderTransformer {
  public fromApi(request?: FastifyRequest<{ Params: FindTablesOrderParamsRequest }>): FindTablesOrderInputDTO {
    const { params } = request;

    return {
      companyId: params.companyId,
    };
  }

  public toApi(outputDTO: FindTablesOrderOutputDTO): FindTablesOrderResponse {
    const tables = outputDTO.tables
    return {
      items: Array.isArray(tables) ? tables.map(f => ({
        id: f?.id ?? '',
        status: this.getStatus({ table: f, pendingTables: outputDTO.pendingTables }),
        totalPrice: f?.totalPrice ?? 0,
        createdAt: f?.createdAt ?? '',
        userData: f?.userData ?? undefined,
        orderData: f?.orderData ?? [],
      })) : [],
    };
  }

  private getStatus({ table, pendingTables }: { table: OrderDTO, pendingTables: { userId: string, status: string }[] }): string {
    if (!table?.orderData) {
      return 'EMPTY'
    }

    if (pendingTables.length > 0) {
      const pending = pendingTables.find(el => el.userId === table.userData.userId)
      if (pending) {
        return pending.status
      }
    }

    return 'OK'
  }
}
