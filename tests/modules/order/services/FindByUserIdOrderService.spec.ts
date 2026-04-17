import {container} from "tsyringe";
import {FindByUserIdOrderService} from "../../../../src/modules/order/services/FindByUserIdOrderService";
        
describe('FindByUserIdOrderService', () => {
     let service: FindByUserIdOrderService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindByUserIdOrderService);
     });
     
     it('Deve testar cenario de FindByUserIdOrder', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindByUserIdOrder').toEqual('FindByUserIdOrder');
     });
 
});
