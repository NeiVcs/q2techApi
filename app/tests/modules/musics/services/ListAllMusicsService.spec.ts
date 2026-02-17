import {container} from "tsyringe";
import {ListAllMusicsService} from "../../../../src/modules/musics/services/ListAllMusicsService";
        
describe('ListAllMusicsService', () => {
     let service: ListAllMusicsService;
     
     beforeEach(() => {
         jest.clearAllMocks();
         service = container.resolve(ListAllMusicsService);
     });
     
     it('Deve testar cenario de ListAllMusics', async () => {
         //TODO: Implementar testes corretamente.
         expect('ListAllMusics').toEqual('ListAllMusics');
     });
 
});
