import {container} from "tsyringe";
import {FindAllCompanyProductService} from "../../../../src/modules/product/services/FindAllCompanyProductService";
        
describe('FindAllCompanyProductService', () => {
     let service: FindAllCompanyProductService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindAllCompanyProductService);
     });
     
     it('Deve testar cenario de FindAllCompanyProduct', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindAllCompanyProduct').toEqual('FindAllCompanyProduct');
     });
 
});
