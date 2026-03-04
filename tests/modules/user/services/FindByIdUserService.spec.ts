import {container} from "tsyringe";
import {FindByIdUserService} from "../../../../src/modules/user/services/FindByIdUserService";
        
describe('FindByIdUserService', () => {
     let service: FindByIdUserService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindByIdUserService);
     });
     
     it('Deve testar cenario de FindByIdUser', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindByIdUser').toEqual('FindByIdUser');
     });
 
});
