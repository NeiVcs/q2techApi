import {container} from "tsyringe";
import {CreateProductService} from "../../../../src/modules/product/services/CreateProductService";
        
describe('CreateProductService', () => {
     let service: CreateProductService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(CreateProductService);
     });
     
     it('Deve testar cenario de CreateProduct', async () => {
         //TODO: Implementar testes corretamente.
         expect('CreateProduct').toEqual('CreateProduct');
     });
 
});
