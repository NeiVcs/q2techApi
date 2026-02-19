import { FastifyReply } from 'fastify';
import { mock } from 'jest-mock-extended';

import { FeePayBillPaymentsController } from '../../../../src/modules/billPayments/controllers/FeePayBillPaymentsController';
import { FeePayBillPaymentsTransformer } from '../../../../src/modules/billPayments/transformers/FeePayBillPaymentsTransformer';
import { FeePayBillPaymentsService } from '../../../../src/modules/billPayments/services/FeePayBillPaymentsService';

describe('FeePayBillPaymentsController', () => {
  let controller: FeePayBillPaymentsController;
  let transformer: jest.Mocked<FeePayBillPaymentsTransformer>;
  let service: jest.Mocked<FeePayBillPaymentsService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FeePayBillPaymentsController(transformer, service);
  });

  it('deve chamar service e retornar 204 sem body', async () => {
    const inputDTO = {
      id: 'fakeString',
      entityId: 'fakeString',
      feeTransactionId: 'fakeString',
      user: {}
    };

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler(
      {
        body: {
          entityId: 'fakeString',
          feeTransactionId: 'fakeString',
          user: {}
        },
        params: {
          id: 'fakeString'
        }
      } as any,
      reply
    );

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(reply.code).toHaveBeenCalledWith(204);
    expect(result).toBeUndefined();
  });
});
