import { container } from 'tsyringe';
import { PaidBillPaymentsService } from '../../../../src/modules/billPayments/services/PaidBillPaymentsService';
import { PedidoBoletoRepository } from '../../../../src/modules/billPayments/repositories/PedidoBoletoRepository';
import { PedidoBoletoHistoryRepository } from '../../../../src/modules/billPayments/repositories/PedidoBoletoHistoryRepository';
import { CreateWithdrawBillPaymentsIntegrationService } from '../../../../src/integrations/mp-matera/services/CreateWithdrawBillPaymentsIntegrationService';
import { ResourceNotFoundException } from '../../../../src/shared/exceptions';

describe('PaidBillPaymentsService', () => {
  let service: PaidBillPaymentsService;
  let mockPedidoBoletoRepository: any;
  let mockPedidoBoletoHistoryRepository: any;
  let mockCreateWithdrawBillPaymentsIntegrationService: any;
  let inputDTO: any;

  beforeEach(() => {
    mockPedidoBoletoRepository = { findByUuidAndEntityId: jest.fn() };
    mockPedidoBoletoHistoryRepository = { existByOrderBillPaymentsIdAndStatus: jest.fn() };
    mockCreateWithdrawBillPaymentsIntegrationService = { execute: jest.fn() };
    container.registerInstance(PedidoBoletoRepository as any, mockPedidoBoletoRepository);
    container.registerInstance(PedidoBoletoHistoryRepository as any, mockPedidoBoletoHistoryRepository);
    container.registerInstance(CreateWithdrawBillPaymentsIntegrationService as any, mockCreateWithdrawBillPaymentsIntegrationService);
    service = container.resolve(PaidBillPaymentsService);
    inputDTO = { id: 'id', entityId: 1 };
  });

  it('deve lançar ResourceNotFoundException se pedido não existir', async () => {
    mockPedidoBoletoRepository.findByUuidAndEntityId.mockResolvedValue(null);
    await expect(service.execute(inputDTO)).rejects.toThrow(ResourceNotFoundException);
  });
});
