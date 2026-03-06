import {container} from "tsyringe";
import {UpdateUserService} from "../../../../src/modules/user/services/UpdateUserService";
        
describe('UpdateUserService', () => {
     let service: UpdateUserService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(UpdateUserService);
     });
     
     it('Deve testar cenario de UpdateUser', async () => {
         //TODO: Implementar testes corretamente.
         expect('UpdateUser').toEqual('UpdateUser');
     });
 
});
