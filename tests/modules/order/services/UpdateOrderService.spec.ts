import {container} from "tsyringe";
import {UpdateOrderService} from "../../../../src/modules/order/services/UpdateOrderService";
        
describe('UpdateOrderService', () => {
     let service: UpdateOrderService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(UpdateOrderService);
     });
     
     it('Deve testar cenario de UpdateOrder', async () => {
         //TODO: Implementar testes corretamente.
         expect('UpdateOrder').toEqual('UpdateOrder');
     });
 
});
