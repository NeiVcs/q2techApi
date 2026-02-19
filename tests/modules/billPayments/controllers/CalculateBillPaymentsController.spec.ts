import { FastifyReply } from 'fastify';
import { mock } from 'jest-mock-extended';

import { CalculateBillPaymentsController } from '../../../../src/modules/billPayments/controllers/CalculateBillPaymentsController';
import { CalculateBillPaymentsTransformer } from '../../../../src/modules/billPayments/transformers/CalculateBillPaymentsTransformer';
import { CalculateBillPaymentsService } from '../../../../src/modules/billPayments/services/CalculateBillPaymentsService';

describe('CalculateBillPaymentsController', () => {
  let controller: CalculateBillPaymentsController;
  let transformer: jest.Mocked<CalculateBillPaymentsTransformer>;
  let service: jest.Mocked<CalculateBillPaymentsService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new CalculateBillPaymentsController(transformer, service);
  });

  it('deve chamar service e transformer corretamente', async () => {
    const inputDTO = {
      segment: 'fakeString',
      accountId: 'fakeString',
      barcode: 'fakeString',
      rates: [{}]
    };
    const outputDTO = {
      transactionRateValue: 123,
      typeAmountAccepted: 123,
      drawee: {},
      beneficiary: {},
      finalBeneficiary: {},
      details: {},
      financialInstitution: 'fakeString',
      status: 'fakeString'
    };

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler(
      {
        body: {
          segment: 'fakeString',
          accountId: 'fakeString',
          barcode: 'fakeString',
          rates: [{}]
        }
      } as any,
      reply
    );

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
