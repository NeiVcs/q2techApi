import {container} from "tsyringe";
import {DeleteMusicService} from "../../../../src/modules/music/services/DeleteMusicService";
        
describe('DeleteMusicService', () => {
     let service: DeleteMusicService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(DeleteMusicService);
     });
     
     it('Deve testar cenario de DeleteMusic', async () => {
         //TODO: Implementar testes corretamente.
         expect('DeleteMusic').toEqual('DeleteMusic');
     });
 
});
