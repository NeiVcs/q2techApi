import {container} from "tsyringe";
import {FindAllUserService} from "../../../../src/modules/user/services/FindAllUserService";
        
describe('FindAllUserService', () => {
     let service: FindAllUserService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindAllUserService);
     });
     
     it('Deve testar cenario de FindAllUser', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindAllUser').toEqual('FindAllUser');
     });
 
});
