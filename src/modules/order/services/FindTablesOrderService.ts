import { singleton } from 'tsyringe';
import { FindTablesOrderInputDTO } from "@modules/order/dto/FindTablesOrderInputDTO";
import { OrderRepository } from "@modules/order/data/OrderRepository";
import { CompanyRepository } from "@modules/company/data/CompanyRepository";
import { FindTablesOrderOutputDTO } from "@modules/order/dto/FindTablesOrderOutputDTO";
import { ResourceNotFoundException } from '@shared/exceptions';
import { OrderDTO } from '../dto/OrderDTO';
import { TableStatusRepository } from '@modules/tableStatus/data/TableStatusRepository';

@singleton()
export class FindTablesOrderService {
  constructor(
    private orderStorage: OrderRepository,
    private companyStorage: CompanyRepository,
    private tableStatusStorage: TableStatusRepository,
  ) { }

  public async execute(inputDTO: FindTablesOrderInputDTO): Promise<FindTablesOrderOutputDTO> {
    const company = await this.companyStorage.findById(inputDTO.companyId);

    if (!company.tables || company.tables.length === 0) {
      throw new ResourceNotFoundException(`Não existem mesas cadastradas`);
    }

    const response = await this.getTableData(inputDTO.companyId, company.tables)

    return response as unknown as FindTablesOrderOutputDTO;
  }

  private async getTableData(companyId: string, tableList: { id: string, table: string }[]): Promise<{ tables: OrderDTO[], pendingTables: any }> {
    const getOrderByTable = async (table: string) => await this.orderStorage.findByUserId({ userId: table });
    const response = await Promise.all(tableList.map((table: { id: string }) => getOrderByTable(table.id)));

    const tables = response.map((el, idx) => { return { ...el.items[0], tableId: tableList[idx].id, tableName: tableList[idx].table } })
    const pendingTables = await this.tableStatusStorage.findByCompanyId({ companyId: companyId })

    return { tables, pendingTables }
  }
}
