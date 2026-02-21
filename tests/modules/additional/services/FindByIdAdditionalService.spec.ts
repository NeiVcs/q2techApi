import {container} from "tsyringe";
import {FindByIdAdditionalService} from "../../../../src/modules/additional/services/FindByIdAdditionalService";
        
describe('FindByIdAdditionalService', () => {
     let service: FindByIdAdditionalService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindByIdAdditionalService);
     });
     
     it('Deve testar cenario de FindByIdAdditional', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindByIdAdditional').toEqual('FindByIdAdditional');
     });
 
});
