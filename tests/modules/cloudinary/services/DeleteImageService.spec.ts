import {container} from "tsyringe";
import {DeleteImageService} from "../../../../src/modules/cloudinary/services/DeleteImageService";
        
describe('DeleteImageService', () => {
     let service: DeleteImageService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(DeleteImageService);
     });
     
     it('Deve testar cenario de DeleteImage', async () => {
         //TODO: Implementar testes corretamente.
         expect('DeleteImage').toEqual('DeleteImage');
     });
 
});
