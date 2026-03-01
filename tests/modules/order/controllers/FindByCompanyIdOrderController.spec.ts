import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindByCompanyIdOrderController } from "../../../../src/modules/order/controllers/FindByCompanyIdOrderController";
import { FindByCompanyIdOrderTransformer } from "../../../../src/modules/order/transformers/FindByCompanyIdOrderTransformer";
import { FindByCompanyIdOrderService } from "../../../../src/modules/order/services/FindByCompanyIdOrderService";

describe("FindByCompanyIdOrderController", () => {
  let controller: FindByCompanyIdOrderController;
  let transformer: jest.Mocked<FindByCompanyIdOrderTransformer>;
  let service: jest.Mocked<FindByCompanyIdOrderService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindByCompanyIdOrderController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "id": "fakeString",
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
  "id": "fakeString"
},
  query: {
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
