import { container } from 'tsyringe';
import { FeePayBillPaymentsService } from '../../../../src/modules/billPayments/services/FeePayBillPaymentsService';
import { FeePayBillPaymentsInputDTO } from '../../../../src/modules/billPayments/dto/FeePayBillPaymentsInputDTO';
import { PedidoBoletoRepository } from '../../../../src/modules/billPayments/repositories/PedidoBoletoRepository';
import { PedidoBoletoHistoryRepository } from '../../../../src/modules/billPayments/repositories/PedidoBoletoHistoryRepository';
import { ResourceNotFoundException } from '../../../../src/shared/exceptions';

describe('FeePayBillPaymentsService', () => {
  let service: FeePayBillPaymentsService;
  let mockPedidoBoletoRepository: any;
  let mockPedidoBoletoHistoryRepository: any;
  let inputDTO: FeePayBillPaymentsInputDTO;

  beforeEach(() => {
    mockPedidoBoletoRepository = { findByUuidAndEntityId: jest.fn() };
    mockPedidoBoletoHistoryRepository = { existByOrderBillPaymentsIdAndStatus: jest.fn() };
    container.registerInstance(PedidoBoletoRepository as any, mockPedidoBoletoRepository);
    container.registerInstance(PedidoBoletoHistoryRepository as any, mockPedidoBoletoHistoryRepository);
    service = container.resolve(FeePayBillPaymentsService);
    inputDTO = { id: 'id', entityId: 1 } as any;
  });

  it('deve lançar ResourceNotFoundException se pedido não existir', async () => {
    mockPedidoBoletoRepository.findByUuidAndEntityId.mockResolvedValue(null);
    await expect(service.execute(inputDTO)).rejects.toThrow(ResourceNotFoundException);
  });
});
