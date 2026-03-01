import {container} from "tsyringe";
import {FindTestService} from "../../../../src/modules/test/services/FindTestService";
        
describe('FindTestService', () => {
     let service: FindTestService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindTestService);
     });
     
     it('Deve testar cenario de FindTest', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindTest').toEqual('FindTest');
     });
 
});
