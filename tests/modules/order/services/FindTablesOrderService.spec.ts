import {container} from "tsyringe";
import {FindTablesOrderService} from "../../../../src/modules/order/services/FindTablesOrderService";
        
describe('FindTablesOrderService', () => {
     let service: FindTablesOrderService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindTablesOrderService);
     });
     
     it('Deve testar cenario de FindTablesOrder', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindTablesOrder').toEqual('FindTablesOrder');
     });
 
});
