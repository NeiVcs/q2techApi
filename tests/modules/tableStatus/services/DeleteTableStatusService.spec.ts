import {container} from "tsyringe";
import {DeleteTableStatusService} from "../../../../src/modules/tableStatus/services/DeleteTableStatusService";
        
describe('DeleteTableStatusService', () => {
     let service: DeleteTableStatusService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(DeleteTableStatusService);
     });
     
     it('Deve testar cenario de DeleteTableStatus', async () => {
         //TODO: Implementar testes corretamente.
         expect('DeleteTableStatus').toEqual('DeleteTableStatus');
     });
 
});
