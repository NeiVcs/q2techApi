import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindByUserIdOrderController } from "../../../../src/modules/order/controllers/FindByUserIdOrderController";
import { FindByUserIdOrderTransformer } from "../../../../src/modules/order/transformers/FindByUserIdOrderTransformer";
import { FindByUserIdOrderService } from "../../../../src/modules/order/services/FindByUserIdOrderService";

describe("FindByUserIdOrderController", () => {
  let controller: FindByUserIdOrderController;
  let transformer: jest.Mocked<FindByUserIdOrderTransformer>;
  let service: jest.Mocked<FindByUserIdOrderService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindByUserIdOrderController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "companyId": "fakeString",
  "userId": "fakeString",
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
  params: {
  "companyId": "fakeString"
},
  query: {
  "userId": "fakeString",
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
