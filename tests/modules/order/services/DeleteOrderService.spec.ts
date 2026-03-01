import {container} from "tsyringe";
import {DeleteOrderService} from "../../../../src/modules/order/services/DeleteOrderService";
        
describe('DeleteOrderService', () => {
     let service: DeleteOrderService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(DeleteOrderService);
     });
     
     it('Deve testar cenario de DeleteOrder', async () => {
         //TODO: Implementar testes corretamente.
         expect('DeleteOrder').toEqual('DeleteOrder');
     });
 
});
