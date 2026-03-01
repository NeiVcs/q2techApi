import {container} from "tsyringe";
import {DeleteProductService} from "../../../../src/modules/product/services/DeleteProductService";
        
describe('DeleteProductService', () => {
     let service: DeleteProductService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(DeleteProductService);
     });
     
     it('Deve testar cenario de DeleteProduct', async () => {
         //TODO: Implementar testes corretamente.
         expect('DeleteProduct').toEqual('DeleteProduct');
     });
 
});
