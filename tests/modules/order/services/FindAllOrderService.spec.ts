import {container} from "tsyringe";
import {FindAllOrderService} from "../../../../src/modules/order/services/FindAllOrderService";
        
describe('FindAllOrderService', () => {
     let service: FindAllOrderService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindAllOrderService);
     });
     
     it('Deve testar cenario de FindAllOrder', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindAllOrder').toEqual('FindAllOrder');
     });
 
});
