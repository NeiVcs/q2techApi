import {container} from "tsyringe";
import {UpdateMusicService} from "../../../../src/modules/music/services/UpdateMusicService";
        
describe('UpdateMusicService', () => {
     let service: UpdateMusicService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(UpdateMusicService);
     });
     
     it('Deve testar cenario de UpdateMusic', async () => {
         //TODO: Implementar testes corretamente.
         expect('UpdateMusic').toEqual('UpdateMusic');
     });
 
});
