import { container } from "tsyringe";
import { FindByCompanyIdProductService } from "../../../../src/modules/product/services/FindByCompanyIdProductService";

describe('FindByCompanyIdProductService', () => {
    let service: FindByCompanyIdProductService;

    beforeEach(() => {
        jest.clearAllMocks();
        service = container.resolve(FindByCompanyIdProductService);
    });

    it('Deve testar cenario de FindByCompanyIdProduct', async () => {
        //TODO: Implementar testes corretamente.
        expect('FindByCompanyIdProduct').toEqual('FindByCompanyIdProduct');
    });

});
