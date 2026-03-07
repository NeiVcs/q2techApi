import {container} from "tsyringe";
import {FindByUrlCompanyService} from "../../../../src/modules/company/services/FindByUrlCompanyService";
        
describe('FindByUrlCompanyService', () => {
     let service: FindByUrlCompanyService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindByUrlCompanyService);
     });
     
     it('Deve testar cenario de FindByUrlCompany', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindByUrlCompany').toEqual('FindByUrlCompany');
     });
 
});
