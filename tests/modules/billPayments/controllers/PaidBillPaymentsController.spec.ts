import { FastifyReply } from 'fastify';
import { mock } from 'jest-mock-extended';

import { PaidBillPaymentsController } from '../../../../src/modules/billPayments/controllers/PaidBillPaymentsController';
import { PaidBillPaymentsTransformer } from '../../../../src/modules/billPayments/transformers/PaidBillPaymentsTransformer';
import { PaidBillPaymentsService } from '../../../../src/modules/billPayments/services/PaidBillPaymentsService';

describe('PaidBillPaymentsController', () => {
  let controller: PaidBillPaymentsController;
  let transformer: jest.Mocked<PaidBillPaymentsTransformer>;
  let service: jest.Mocked<PaidBillPaymentsService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new PaidBillPaymentsController(transformer, service);
  });

  it('deve chamar service e retornar 204 sem body', async () => {
    const inputDTO = {
      id: 'fakeString',
      entityId: 'fakeString',
      user: {}
    };

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler(
      {
        body: {
          entityId: 'fakeString',
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
