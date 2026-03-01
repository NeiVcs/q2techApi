import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { CreateOrderController } from "../../../../src/modules/order/controllers/CreateOrderController";
import { CreateOrderTransformer } from "../../../../src/modules/order/transformers/CreateOrderTransformer";
import { CreateOrderService } from "../../../../src/modules/order/services/CreateOrderService";

describe("CreateOrderController", () => {
  let controller: CreateOrderController;
  let transformer: jest.Mocked<CreateOrderTransformer>;
  let service: jest.Mocked<CreateOrderService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new CreateOrderController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "companyId": "fakeString",
  "paymentForm": "fakeString",
  "totalPrice": 123,
  "payedPrice": 123,
  "change": 123,
  "deliveryMode": "fakeString",
  "rating": 123,
  "notification": "fakeString",
  "userData": {},
  "orderData": [
    {}
  ]
};
    const outputDTO = {
  "id": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  body: {
  "companyId": "fakeString",
  "paymentForm": "fakeString",
  "totalPrice": 123,
  "payedPrice": 123,
  "change": 123,
  "deliveryMode": "fakeString",
  "rating": 123,
  "notification": "fakeString",
  "userData": {},
  "orderData": [
    {}
  ]
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(result).toEqual(outputDTO);
  });
});
