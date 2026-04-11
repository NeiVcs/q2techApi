import {container} from "tsyringe";
import {UpdateUserPasswordService} from "../../../../src/modules/user/services/UpdateUserPasswordService";
        
describe('UpdateUserPasswordService', () => {
     let service: UpdateUserPasswordService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(UpdateUserPasswordService);
     });
     
     it('Deve testar cenario de UpdateUserPassword', async () => {
         //TODO: Implementar testes corretamente.
         expect('UpdateUserPassword').toEqual('UpdateUserPassword');
     });
 
});
