import {container} from "tsyringe";
import {CreateUserService} from "../../../../src/modules/user/services/CreateUserService";
        
describe('CreateUserService', () => {
     let service: CreateUserService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(CreateUserService);
     });
     
     it('Deve testar cenario de CreateUser', async () => {
         //TODO: Implementar testes corretamente.
         expect('CreateUser').toEqual('CreateUser');
     });
 
});
