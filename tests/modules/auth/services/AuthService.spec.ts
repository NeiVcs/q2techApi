import {container} from "tsyringe";
import {AuthService} from "../../../../src/modules/auth/services/AuthService";
        
describe('AuthService', () => {
     let service: AuthService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(AuthService);
     });
     
     it('Deve testar cenario de Auth', async () => {
         //TODO: Implementar testes corretamente.
         expect('Auth').toEqual('Auth');
     });
 
});
