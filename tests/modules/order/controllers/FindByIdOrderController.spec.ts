import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindByIdOrderController } from "../../../../src/modules/order/controllers/FindByIdOrderController";
import { FindByIdOrderTransformer } from "../../../../src/modules/order/transformers/FindByIdOrderTransformer";
import { FindByIdOrderService } from "../../../../src/modules/order/services/FindByIdOrderService";

describe("FindByIdOrderController", () => {
  let controller: FindByIdOrderController;
  let transformer: jest.Mocked<FindByIdOrderTransformer>;
  let service: jest.Mocked<FindByIdOrderService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindByIdOrderController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "id": "fakeString"
};
    const outputDTO = {
  "id": "fakeString",
  "companyId": "fakeString",
  "status": "fakeString",
  "paymentForm": "fakeString",
  "totalPrice": 123,
  "payedPrice": 123,
  "change": 123,
  "deliveryMode": "fakeString",
  "rating": 123,
  "notification": "fakeString",
  "createdAt": "fakeString",
  "userData": {},
  "orderData": [
    {}
  ]
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  params: {
  "id": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
