import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindAllOrderController } from "../../../../src/modules/order/controllers/FindAllOrderController";
import { FindAllOrderTransformer } from "../../../../src/modules/order/transformers/FindAllOrderTransformer";
import { FindAllOrderService } from "../../../../src/modules/order/services/FindAllOrderService";

describe("FindAllOrderController", () => {
  let controller: FindAllOrderController;
  let transformer: jest.Mocked<FindAllOrderTransformer>;
  let service: jest.Mocked<FindAllOrderService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindAllOrderController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "companyId": "fakeString",
  "status": "fakeString",
  "page": 123,
  "pageSize": 123
};
    const outputDTO = {
  "pagination": {},
  "items": [
    {}
  ]
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  query: {
  "companyId": "fakeString",
  "status": "fakeString",
  "page": 123,
  "pageSize": 123
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
