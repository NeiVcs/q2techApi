import {container} from "tsyringe";
import {FindAllCompanyService} from "../../../../src/modules/company/services/FindAllCompanyService";
        
describe('FindAllCompanyService', () => {
     let service: FindAllCompanyService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindAllCompanyService);
     });
     
     it('Deve testar cenario de FindAllCompany', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindAllCompany').toEqual('FindAllCompany');
     });
 
});
