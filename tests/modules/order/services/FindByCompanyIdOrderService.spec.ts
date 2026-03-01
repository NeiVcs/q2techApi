import {container} from "tsyringe";
import {FindByCompanyIdOrderService} from "../../../../src/modules/order/services/FindByCompanyIdOrderService";
        
describe('FindByCompanyIdOrderService', () => {
     let service: FindByCompanyIdOrderService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindByCompanyIdOrderService);
     });
     
     it('Deve testar cenario de FindByCompanyIdOrder', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindByCompanyIdOrder').toEqual('FindByCompanyIdOrder');
     });
 
});
