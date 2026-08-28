import {container} from "tsyringe";
import {RequestUserDeletionService} from "../../../../src/modules/user/services/RequestUserDeletionService";
        
describe('RequestUserDeletionService', () => {
     let service: RequestUserDeletionService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(RequestUserDeletionService);
     });
     
     it('Deve testar cenario de RequestUserDeletion', async () => {
         //TODO: Implementar testes corretamente.
         expect('RequestUserDeletion').toEqual('RequestUserDeletion');
     });
 
});
