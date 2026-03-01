import {container} from "tsyringe";
import {UpdateCompanyService} from "../../../../src/modules/company/services/UpdateCompanyService";
        
describe('UpdateCompanyService', () => {
     let service: UpdateCompanyService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(UpdateCompanyService);
     });
     
     it('Deve testar cenario de UpdateCompany', async () => {
         //TODO: Implementar testes corretamente.
         expect('UpdateCompany').toEqual('UpdateCompany');
     });
 
});
