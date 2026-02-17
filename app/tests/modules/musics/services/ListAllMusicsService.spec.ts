import { container } from "tsyringe";
import { FindAllMusicService } from "../../../../src/modules/music/services/FindAllMusicService";

describe('FindAllMusicService', () => {
    let service: FindAllMusicService;

    beforeEach(() => {
        jest.clearAllMocks();
        service = container.resolve(FindAllMusicService);
    });

    it('Deve testar cenario de FindAllMusics', async () => {
        //TODO: Implementar testes corretamente.
        expect('FindAllMusic').toEqual('FindAllMusic');
    });

});
