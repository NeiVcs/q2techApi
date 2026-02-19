import {container} from "tsyringe";
import {CreateMusicService} from "../../../../src/modules/music/services/CreateMusicService";
        
describe('CreateMusicService', () => {
     let service: CreateMusicService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(CreateMusicService);
     });
     
     it('Deve testar cenario de CreateMusic', async () => {
         //TODO: Implementar testes corretamente.
         expect('CreateMusic').toEqual('CreateMusic');
     });
 
});
