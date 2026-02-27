import {container} from "tsyringe";
import {CreateCompanyService} from "../../../../src/modules/company/services/CreateCompanyService";
        
describe('CreateCompanyService', () => {
     let service: CreateCompanyService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(CreateCompanyService);
     });
     
     it('Deve testar cenario de CreateCompany', async () => {
         //TODO: Implementar testes corretamente.
         expect('CreateCompany').toEqual('CreateCompany');
     });
 
});
