import {container} from "tsyringe";
import {CreateUserAndCompanyService} from "../../../../src/modules/user/services/CreateUserAndCompanyService";
        
describe('CreateUserAndCompanyService', () => {
     let service: CreateUserAndCompanyService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(CreateUserAndCompanyService);
     });
     
     it('Deve testar cenario de CreateUserAndCompany', async () => {
         //TODO: Implementar testes corretamente.
         expect('CreateUserAndCompany').toEqual('CreateUserAndCompany');
     });
 
});
