import {container} from "tsyringe";
import {CreateTableStatusService} from "../../../../src/modules/tableStatus/services/CreateTableStatusService";
        
describe('CreateTableStatusService', () => {
     let service: CreateTableStatusService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(CreateTableStatusService);
     });
     
     it('Deve testar cenario de CreateTableStatus', async () => {
         //TODO: Implementar testes corretamente.
         expect('CreateTableStatus').toEqual('CreateTableStatus');
     });
 
});
