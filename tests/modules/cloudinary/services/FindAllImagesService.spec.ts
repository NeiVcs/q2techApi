import {container} from "tsyringe";
import {FindAllImagesService} from "../../../../src/modules/cloudinary/services/FindAllImagesService";
        
describe('FindAllImagesService', () => {
     let service: FindAllImagesService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindAllImagesService);
     });
     
     it('Deve testar cenario de FindAllImages', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindAllImages').toEqual('FindAllImages');
     });
 
});
