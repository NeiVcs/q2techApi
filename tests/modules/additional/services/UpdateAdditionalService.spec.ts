import {container} from "tsyringe";
import {UpdateAdditionalService} from "../../../../src/modules/additional/services/UpdateAdditionalService";
        
describe('UpdateAdditionalService', () => {
     let service: UpdateAdditionalService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(UpdateAdditionalService);
     });
     
     it('Deve testar cenario de UpdateAdditional', async () => {
         //TODO: Implementar testes corretamente.
         expect('UpdateAdditional').toEqual('UpdateAdditional');
     });
 
});
