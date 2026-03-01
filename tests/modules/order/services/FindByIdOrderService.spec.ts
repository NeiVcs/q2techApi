import {container} from "tsyringe";
import {FindByIdOrderService} from "../../../../src/modules/order/services/FindByIdOrderService";
        
describe('FindByIdOrderService', () => {
     let service: FindByIdOrderService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindByIdOrderService);
     });
     
     it('Deve testar cenario de FindByIdOrder', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindByIdOrder').toEqual('FindByIdOrder');
     });
 
});
