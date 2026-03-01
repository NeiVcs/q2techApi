import {container} from "tsyringe";
import {CreateOrderService} from "../../../../src/modules/order/services/CreateOrderService";
        
describe('CreateOrderService', () => {
     let service: CreateOrderService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(CreateOrderService);
     });
     
     it('Deve testar cenario de CreateOrder', async () => {
         //TODO: Implementar testes corretamente.
         expect('CreateOrder').toEqual('CreateOrder');
     });
 
});
