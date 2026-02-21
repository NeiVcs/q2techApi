import {container} from "tsyringe";
import {DeleteAdditionalService} from "../../../../src/modules/additional/services/DeleteAdditionalService";
        
describe('DeleteAdditionalService', () => {
     let service: DeleteAdditionalService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(DeleteAdditionalService);
     });
     
     it('Deve testar cenario de DeleteAdditional', async () => {
         //TODO: Implementar testes corretamente.
         expect('DeleteAdditional').toEqual('DeleteAdditional');
     });
 
});
