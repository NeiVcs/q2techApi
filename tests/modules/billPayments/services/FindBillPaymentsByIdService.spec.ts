import { container } from 'tsyringe';
import { FindBillPaymentsByIdService } from '../../../../src/modules/billPayments/services/FindBillPaymentsByIdService';
import { PedidoBoletoRepository } from '../../../../src/modules/billPayments/repositories/PedidoBoletoRepository';

describe('FindBillPaymentsByIdService', () => {
  let service: FindBillPaymentsByIdService;
  let mockPedidoBoletoRepository: any;
  let inputDTO: any;

  beforeEach(() => {
    mockPedidoBoletoRepository = { findByUuidAndEntityIdDetails: jest.fn() };
    container.registerInstance(PedidoBoletoRepository as any, mockPedidoBoletoRepository);
    service = container.resolve(FindBillPaymentsByIdService);
    inputDTO = { id: 'id', entityId: 1 };
  });

  it('deve retornar o pedido se existir', async () => {
    mockPedidoBoletoRepository.findByUuidAndEntityIdDetails.mockResolvedValue({ id: 'id' });
    const result = await service.execute(inputDTO);
    expect(result).toEqual({ id: 'id' });
  });
});
