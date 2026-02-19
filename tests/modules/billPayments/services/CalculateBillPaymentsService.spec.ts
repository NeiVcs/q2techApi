import { container } from 'tsyringe';
import { CalculateBillPaymentsService } from '../../../../src/modules/billPayments/services/CalculateBillPaymentsService';
import { CalculateBillPaymentsInputDTO } from '../../../../src/modules/billPayments/dto/CalculateBillPaymentsInputDTO';
import { CalculateBillPaymentsOutputDTO } from '../../../../src/modules/billPayments/dto/CalculateBillPaymentsOutputDTO';
import { ResourceNotFoundException } from '../../../../src/shared/exceptions';

const getCacheMock = jest.fn();
const setCacheMock = jest.fn();

jest.mock('../../../../src/modules/billPayments/helpers/CalculateBillPaymentsCacheHelper', () => ({
  CalculateBillPaymentsCacheHelper: {
    getCache: (...args: any[]) => getCacheMock(...args),
    setCache: (...args: any[]) => setCacheMock(...args)
  }
}));

describe('CalculateBillPaymentsService', () => {
  let service: CalculateBillPaymentsService;
  let inputDTO: CalculateBillPaymentsInputDTO;
  let outputDTO: CalculateBillPaymentsOutputDTO;
  let getBillDataByBarcodeIntegrationService: any;

  beforeEach(() => {
    jest.resetModules();
    getCacheMock.mockReset();
    setCacheMock.mockReset();
    getBillDataByBarcodeIntegrationService = { execute: jest.fn() };
    container.clearInstances();
    container.registerInstance(
      require('../../../../src/integrations/mp-matera/services/GetBillDataByBarcodeIntegrationService').GetBillDataByBarcodeIntegrationService,
      getBillDataByBarcodeIntegrationService
    );
    service = container.resolve(CalculateBillPaymentsService);
    inputDTO = { barcode: '123', segment: 'A', rates: [], accountId: 'acc' } as any;
    outputDTO = { typeAmountAccepted: 1, drawee: {}, beneficiary: {}, finalBeneficiary: {}, details: {}, financialInstitution: '', status: '', rates: [], transactionRateValue: 0 } as any;
  });

  it('deve retornar do cache se existir', async () => {
    getCacheMock.mockResolvedValue({ ...outputDTO, rates: [] });
    const result = await service.execute(inputDTO);
    expect(result).toEqual(expect.objectContaining(outputDTO));
    expect(getCacheMock).toHaveBeenCalled();
  });

  it('deve lançar exceção se não encontrar dados', async () => {
    getCacheMock.mockResolvedValue(null);
    getBillDataByBarcodeIntegrationService.execute.mockResolvedValue({ data: null }); // Simula resposta sem dados
    await expect(service.execute(inputDTO)).rejects.toThrow(ResourceNotFoundException);
  });
});
