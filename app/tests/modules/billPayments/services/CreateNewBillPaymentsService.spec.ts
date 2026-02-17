import { container } from 'tsyringe';
import { CreateNewBillPaymentsService } from '../../../../src/modules/billPayments/services/CreateNewBillPaymentsService';
import { CreateNewBillPaymentsInputDTO } from '../../../../src/modules/billPayments/dto/CreateNewBillPaymentsInputDTO';
import { CreateNewBillPaymentsOutputDTO } from '../../../../src/modules/billPayments/dto/CreateNewBillPaymentsOutputDTO';
import { PedidoBoletoRepository } from '../../../../src/modules/billPayments/repositories/PedidoBoletoRepository';
import { PedidoBoletoInformacaoRepository } from '../../../../src/modules/billPayments/repositories/PedidoBoletoInformacaoRepository';
import { PedidoBoletoHistoryRepository } from '../../../../src/modules/billPayments/repositories/PedidoBoletoHistoryRepository';
import { PedidoBoletoTarifaRepository } from '../../../../src/modules/billPayments/repositories/PedidoBoletoTarifaRepository';
import { CreateNewBillPaymentsTransformer } from '../../../../src/modules/billPayments/transformers/CreateNewBillPaymentsTransformer';
import { UpdateBillPaymentsService } from '../../../../src/modules/billPayments/services/UpdateBillPaymentsService';
import { CalculateBillPaymentsCacheHelper } from '../../../../src/modules/billPayments/helpers/CalculateBillPaymentsCacheHelper';
// @ts-ignore
import dayjs from 'dayjs';

jest.mock('../../../../src/modules/billPayments/helpers/CalculateBillPaymentsCacheHelper');

const mockPedidoBoletoRepository = { findByUuidAndEntityId: jest.fn(), findById: jest.fn() };
const mockPedidoBoletoInformacaoRepository = {};
const mockPedidoBoletoHistoryRepository = {};
const mockPedidoBoletoTarifaRepository = {};
const mockTransformer = { toEntity: jest.fn() };
const mockUpdateBillPaymentsService = { execute: jest.fn() };

describe('CreateNewBillPaymentsService', () => {
  let service: CreateNewBillPaymentsService;
  let inputDTO: CreateNewBillPaymentsInputDTO;
  let outputDTO: CreateNewBillPaymentsOutputDTO;

  beforeEach(() => {
    jest.clearAllMocks();
    container.registerInstance(PedidoBoletoRepository as any, mockPedidoBoletoRepository);
    container.registerInstance(PedidoBoletoInformacaoRepository as any, mockPedidoBoletoInformacaoRepository);
    container.registerInstance(PedidoBoletoHistoryRepository as any, mockPedidoBoletoHistoryRepository);
    container.registerInstance(PedidoBoletoTarifaRepository as any, mockPedidoBoletoTarifaRepository);
    container.registerInstance(CreateNewBillPaymentsTransformer as any, mockTransformer);
    container.registerInstance(UpdateBillPaymentsService as any, mockUpdateBillPaymentsService);
    service = container.resolve(CreateNewBillPaymentsService);
    inputDTO = { xIdempotencyKey: 'idemp', entityId: 1, barcode: '123', segment: 'A', user: {}, needAuthorization: false } as any;
    outputDTO = { id: 'uuid', createdAt: dayjs('2026-02-02T00:00:00Z').format('YYYY-MM-DD HH:mm:ss.SSS') };
  });

  it('deve retornar pedido existente e limpar cache', async () => {
    mockPedidoBoletoRepository.findByUuidAndEntityId.mockResolvedValue({ uuid: 'uuid', criado_em: dayjs('2026-02-02T00:00:00Z') });
    (CalculateBillPaymentsCacheHelper.delCache as jest.Mock).mockResolvedValue(undefined);
    const result = await service.execute(inputDTO);
    expect(result).toEqual(outputDTO);
    expect(CalculateBillPaymentsCacheHelper.delCache).toHaveBeenCalled();
  });

  it('deve criar novo pedido e atualizar status se não precisar autorização', async () => {
    mockPedidoBoletoRepository.findByUuidAndEntityId.mockResolvedValue(null);
    (CalculateBillPaymentsCacheHelper.delCache as jest.Mock).mockResolvedValue(undefined);
    (service as any).getCalculateBillPaymentsCacheOrThrow = jest.fn().mockResolvedValue({});
    (service as any).saveOrderBillPayments = jest.fn().mockResolvedValue(1);
    mockUpdateBillPaymentsService.execute.mockResolvedValue(undefined);
    mockPedidoBoletoRepository.findById.mockResolvedValue({ uuid: 'uuid', criado_em: dayjs('2026-02-02T00:00:00Z') });
    const result = await service.execute(inputDTO);
    expect(result).toEqual(outputDTO);
    expect(mockUpdateBillPaymentsService.execute).toHaveBeenCalled();
    expect(CalculateBillPaymentsCacheHelper.delCache).toHaveBeenCalled();
  });
});
