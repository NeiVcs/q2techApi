import {container} from "tsyringe";
import {CreateAdditionalService} from "../../../../src/modules/additional/services/CreateAdditionalService";
        
describe('CreateAdditionalService', () => {
     let service: CreateAdditionalService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(CreateAdditionalService);
     });
     
     it('Deve testar cenario de CreateAdditional', async () => {
         //TODO: Implementar testes corretamente.
         expect('CreateAdditional').toEqual('CreateAdditional');
     });
 
});
