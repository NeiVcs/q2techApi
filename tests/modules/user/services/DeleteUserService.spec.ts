import {container} from "tsyringe";
import {DeleteUserService} from "../../../../src/modules/user/services/DeleteUserService";
        
describe('DeleteUserService', () => {
     let service: DeleteUserService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(DeleteUserService);
     });
     
     it('Deve testar cenario de DeleteUser', async () => {
         //TODO: Implementar testes corretamente.
         expect('DeleteUser').toEqual('DeleteUser');
     });
 
});
