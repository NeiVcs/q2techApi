import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindTablesOrderController } from "../../../../src/modules/order/controllers/FindTablesOrderController";
import { FindTablesOrderTransformer } from "../../../../src/modules/order/transformers/FindTablesOrderTransformer";
import { FindTablesOrderService } from "../../../../src/modules/order/services/FindTablesOrderService";

describe("FindTablesOrderController", () => {
  let controller: FindTablesOrderController;
  let transformer: jest.Mocked<FindTablesOrderTransformer>;
  let service: jest.Mocked<FindTablesOrderService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindTablesOrderController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {};
    const outputDTO = {
  "items": [
    {}
  ]
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
