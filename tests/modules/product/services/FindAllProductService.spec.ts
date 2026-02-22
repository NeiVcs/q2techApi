import {container} from "tsyringe";
import {FindAllProductService} from "../../../../src/modules/product/services/FindAllProductService";
        
describe('FindAllProductService', () => {
     let service: FindAllProductService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindAllProductService);
     });
     
     it('Deve testar cenario de FindAllProduct', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindAllProduct').toEqual('FindAllProduct');
     });
 
});
