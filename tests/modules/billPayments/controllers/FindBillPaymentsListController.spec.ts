import { FastifyReply } from 'fastify';
import { mock } from 'jest-mock-extended';

import { FindBillPaymentsListController } from '../../../../src/modules/billPayments/controllers/FindBillPaymentsListController';
import { FindBillPaymentsListTransformer } from '../../../../src/modules/billPayments/transformers/FindBillPaymentsListTransformer';
import { FindBillPaymentsListService } from '../../../../src/modules/billPayments/services/FindBillPaymentsListService';

describe('FindBillPaymentsListController', () => {
  let controller: FindBillPaymentsListController;
  let transformer: jest.Mocked<FindBillPaymentsListTransformer>;
  let service: jest.Mocked<FindBillPaymentsListService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindBillPaymentsListController(transformer, service);
  });

  it('deve chamar service e transformer corretamente', async () => {
    const inputDTO = {
      page: 123,
      pageSize: 123,
      status: 'fakeString',
      entityId: 'fakeString'
    };
    const outputDTO = {
      pagination: {},
      items: [{}]
    };

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler(
      {
        query: {
          page: 123,
          pageSize: 123,
          status: 'fakeString',
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
