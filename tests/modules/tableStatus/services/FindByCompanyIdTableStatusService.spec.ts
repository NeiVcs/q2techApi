import {container} from "tsyringe";
import {FindByCompanyIdTableStatusService} from "../../../../src/modules/tableStatus/services/FindByCompanyIdTableStatusService";
        
describe('FindByCompanyIdTableStatusService', () => {
     let service: FindByCompanyIdTableStatusService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindByCompanyIdTableStatusService);
     });
     
     it('Deve testar cenario de FindByCompanyIdTableStatus', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindByCompanyIdTableStatus').toEqual('FindByCompanyIdTableStatus');
     });
 
});
