import {container} from "tsyringe";
import {FindAllTableStatusService} from "../../../../src/modules/tableStatus/services/FindAllTableStatusService";
        
describe('FindAllTableStatusService', () => {
     let service: FindAllTableStatusService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindAllTableStatusService);
     });
     
     it('Deve testar cenario de FindAllTableStatus', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindAllTableStatus').toEqual('FindAllTableStatus');
     });
 
});
