import {container} from "tsyringe";
import {UpdateProductService} from "../../../../src/modules/product/services/UpdateProductService";
        
describe('UpdateProductService', () => {
     let service: UpdateProductService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(UpdateProductService);
     });
     
     it('Deve testar cenario de UpdateProduct', async () => {
         //TODO: Implementar testes corretamente.
         expect('UpdateProduct').toEqual('UpdateProduct');
     });
 
});
