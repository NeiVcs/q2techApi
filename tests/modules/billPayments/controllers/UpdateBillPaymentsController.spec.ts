import { FastifyReply } from 'fastify';
import { mock } from 'jest-mock-extended';

import { UpdateBillPaymentsController } from '../../../../src/modules/billPayments/controllers/UpdateBillPaymentsController';
import { UpdateBillPaymentsTransformer } from '../../../../src/modules/billPayments/transformers/UpdateBillPaymentsTransformer';
import { UpdateBillPaymentsService } from '../../../../src/modules/billPayments/services/UpdateBillPaymentsService';

describe('UpdateBillPaymentsController', () => {
  let controller: UpdateBillPaymentsController;
  let transformer: jest.Mocked<UpdateBillPaymentsTransformer>;
  let service: jest.Mocked<UpdateBillPaymentsService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new UpdateBillPaymentsController(transformer, service);
  });

  it('deve chamar service e retornar 204 sem body', async () => {
    const inputDTO = {
      id: 'fakeString',
      entityId: 'fakeString',
      status: 'fakeString',
      user: {}
    };

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler(
      {
        body: {
          entityId: 'fakeString',
          status: 'fakeString',
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
