import {container} from "tsyringe";
import {FindByIdMusicService} from "../../../../src/modules/music/services/FindByIdMusicService";
        
describe('FindByIdMusicService', () => {
     let service: FindByIdMusicService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(FindByIdMusicService);
     });
     
     it('Deve testar cenario de FindByIdMusic', async () => {
         //TODO: Implementar testes corretamente.
         expect('FindByIdMusic').toEqual('FindByIdMusic');
     });
 
});
