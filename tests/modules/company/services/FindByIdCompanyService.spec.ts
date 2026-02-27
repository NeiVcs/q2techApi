import {container} from "tsyringe";
import {FindByIdCompanyService} from "../../../../src/modules/company/services/FindByIdCompanyService";
        
describe('FindByIdCompanyService', () => {
     let service: FindByIdCompanyService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindByIdCompanyService);
     });
     
     it('Deve testar cenario de FindByIdCompany', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindByIdCompany').toEqual('FindByIdCompany');
     });
 
});
