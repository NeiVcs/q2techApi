import { container } from 'tsyringe';
import { UpdateBillPaymentsService } from '../../../../src/modules/billPayments/services/UpdateBillPaymentsService';
import { PedidoBoletoRepository } from '../../../../src/modules/billPayments/repositories/PedidoBoletoRepository';
import { PedidoBoletoHistoryRepository } from '../../../../src/modules/billPayments/repositories/PedidoBoletoHistoryRepository';
import { BadRequestException, ConflictAlreadyExistsException, ResourceNotFoundException } from '../../../../src/shared/exceptions';

describe('UpdateBillPaymentsService', () => {
  let service: UpdateBillPaymentsService;
  let mockPedidoBoletoRepository: any;
  let mockPedidoBoletoHistoryRepository: any;
  let inputDTO: any;

  beforeEach(() => {
    mockPedidoBoletoRepository = { findByUuidAndEntityId: jest.fn() };
    mockPedidoBoletoHistoryRepository = {};
    container.registerInstance(PedidoBoletoRepository as any, mockPedidoBoletoRepository);
    container.registerInstance(PedidoBoletoHistoryRepository as any, mockPedidoBoletoHistoryRepository);
    service = container.resolve(UpdateBillPaymentsService);
    inputDTO = { id: 'id', entityId: 1, status: 'PENDENTE' };
  });

  it('deve lançar ResourceNotFoundException se pedido não existir', async () => {
    mockPedidoBoletoRepository.findByUuidAndEntityId.mockResolvedValue(null);
    await expect(service.execute(inputDTO)).rejects.toThrow(ResourceNotFoundException);
  });
});
