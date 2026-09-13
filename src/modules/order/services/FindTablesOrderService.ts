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
    //TODO: incluir tables na empresa
    const tableList = [
      { id: '4b97150f-76f9-416d-af14-48174a630367', table: '1' },
      { id: 'f89b4d98-e2ad-4a65-aa0d-6682bf4cffc8', table: '2' },
      { id: '4e6288b2-6a60-42bc-87a0-2bbabd3ef954', table: '3' }
    ]

    if (tableList.length === 0) {
      throw new ResourceNotFoundException(`Não existem mesas cadastradas`);
    }

    const response = await this.getTableData(inputDTO.companyId, tableList)

    return response as unknown as FindTablesOrderOutputDTO;
  }

  private async getTableData(companyId: string, tableList: { id: string, table: string }[]): Promise<{ tables: OrderDTO[], pendingTables: any }> {
    const getOrderByTable = async (table: string) => await this.orderStorage.findByUserId({ userId: table });
    const response = await Promise.all(tableList.map((table: { id: string }) => getOrderByTable(table.id)));

    const tables = response.map((el, idx) => { return { ...el.items[0], userData: { userId: tableList[idx].id } } })
    const pendingTables = await this.tableStatusStorage.findByCompanyId({ companyId: companyId })

    return { tables, pendingTables }
  }
}
