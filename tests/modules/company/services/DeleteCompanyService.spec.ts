import {container} from "tsyringe";
import {DeleteCompanyService} from "../../../../src/modules/company/services/DeleteCompanyService";
        
describe('DeleteCompanyService', () => {
     let service: DeleteCompanyService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(DeleteCompanyService);
     });
     
     it('Deve testar cenario de DeleteCompany', async () => {
         //TODO: Implementar testes corretamente.
         expect('DeleteCompany').toEqual('DeleteCompany');
     });
 
});
