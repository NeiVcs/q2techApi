import {container} from "tsyringe";
import {FindByIdProductService} from "../../../../src/modules/product/services/FindByIdProductService";
        
describe('FindByIdProductService', () => {
     let service: FindByIdProductService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindByIdProductService);
     });
     
     it('Deve testar cenario de FindByIdProduct', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindByIdProduct').toEqual('FindByIdProduct');
     });
 
});
