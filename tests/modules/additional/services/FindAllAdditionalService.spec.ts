import {container} from "tsyringe";
import {FindAllAdditionalService} from "../../../../src/modules/additional/services/FindAllAdditionalService";
        
describe('FindAllAdditionalService', () => {
     let service: FindAllAdditionalService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindAllAdditionalService);
     });
     
     it('Deve testar cenario de FindAllAdditional', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindAllAdditional').toEqual('FindAllAdditional');
     });
 
});
