import {container} from "tsyringe";
import {RefreshTokenService} from "../../../../src/modules/auth/services/RefreshTokenService";
        
describe('RefreshTokenService', () => {
     let service: RefreshTokenService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(RefreshTokenService);
     });
     
     it('Deve testar cenario de RefreshToken', async () => {
         //TODO: Implementar testes corretamente.
         expect('RefreshToken').toEqual('RefreshToken');
     });
 
});
