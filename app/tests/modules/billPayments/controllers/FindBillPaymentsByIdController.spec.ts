import { FastifyReply } from 'fastify';
import { mock } from 'jest-mock-extended';

import { FindBillPaymentsByIdController } from '../../../../src/modules/billPayments/controllers/FindBillPaymentsByIdController';
import { FindBillPaymentsByIdTransformer } from '../../../../src/modules/billPayments/transformers/FindBillPaymentsByIdTransformer';
import { FindBillPaymentsByIdService } from '../../../../src/modules/billPayments/services/FindBillPaymentsByIdService';

describe('FindBillPaymentsByIdController', () => {
  let controller: FindBillPaymentsByIdController;
  let transformer: jest.Mocked<FindBillPaymentsByIdTransformer>;
  let service: jest.Mocked<FindBillPaymentsByIdService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindBillPaymentsByIdController(transformer, service);
  });

  it('deve chamar service e transformer corretamente', async () => {
    const inputDTO = {
      id: 'fakeString',
      entityId: 'fakeString'
    };
    const outputDTO = {
      id: 'fakeString',
      entityId: 'fakeString',
      entityAccountId: 'fakeString',
      status: 'fakeString',
      withdrawType: 'fakeString',
      segment: 'fakeString',
      billPaymentInterestsValue: 123,
      billPaymentFineValue: 123,
      billPaymentDiscountValue: 123,
      billPaymentTotalValue: 123,
      billPaymentDueDate: 'fakeString',
      billPaymentBarcode: 'fakeString',
      totalFeeValue: 123,
      totalOrderValue: 123,
      feeChargeUuid: 'fakeString',
      feeTransactionId: 'fakeString',
      feeRefundUuid: 'fakeString',
      histories: [{}],
      rates: [{}],
      updatedAt: 'fakeString',
      createdAt: 'fakeString'
    };

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler(
      {
        params: {
          id: 'fakeString'
        },
        query: {
          entityId: 'fakeString'
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
