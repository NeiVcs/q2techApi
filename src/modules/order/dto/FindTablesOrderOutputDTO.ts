import { OrderDTO } from "./OrderDTO";

export interface FindTablesOrderOutputDTO {
  tables: OrderDTO[],
  pendingTables: { id: string, companyId: string, userId: string, status: string }[]
}