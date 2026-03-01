import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { UpdateOrderController } from "../../../../src/modules/order/controllers/UpdateOrderController";
import { UpdateOrderTransformer } from "../../../../src/modules/order/transformers/UpdateOrderTransformer";
import { UpdateOrderService } from "../../../../src/modules/order/services/UpdateOrderService";

describe("UpdateOrderController", () => {
  let controller: UpdateOrderController;
  let transformer: jest.Mocked<UpdateOrderTransformer>;
  let service: jest.Mocked<UpdateOrderService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new UpdateOrderController(transformer, service);
  });
  
  it("deve chamar service e retornar 204 sem body", async () => {
    const inputDTO = {
  "id": "fakeString",
  "orderId": "fakeString",
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

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler({
  body: {
  "orderId": "fakeString",
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
},
  params: {
  "id": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(reply.code).toHaveBeenCalledWith(204);
    expect(result).toBeUndefined();
  });
});
