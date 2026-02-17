import { container } from 'tsyringe';
import { FindBillPaymentsListService } from '../../../../src/modules/billPayments/services/FindBillPaymentsListService';
import { PedidoBoletoRepository } from '../../../../src/modules/billPayments/repositories/PedidoBoletoRepository';

describe('FindBillPaymentsListService', () => {
  let service: FindBillPaymentsListService;
  let mockPedidoBoletoRepository: any;
  let inputDTO: any;

  beforeEach(() => {
    mockPedidoBoletoRepository = { findQueryPagination: jest.fn() };
    container.registerInstance(PedidoBoletoRepository as any, mockPedidoBoletoRepository);
    service = container.resolve(FindBillPaymentsListService);
    inputDTO = { page: 1, size: 10 };
  });

  it('deve retornar a lista paginada', async () => {
    mockPedidoBoletoRepository.findQueryPagination.mockResolvedValue({ items: [], total: 0 });
    const result = await service.execute(inputDTO);
    expect(result).toEqual({ items: [], total: 0 });
  });
});
