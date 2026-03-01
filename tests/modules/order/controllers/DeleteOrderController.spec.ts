import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { DeleteOrderController } from "../../../../src/modules/order/controllers/DeleteOrderController";
import { DeleteOrderTransformer } from "../../../../src/modules/order/transformers/DeleteOrderTransformer";
import { DeleteOrderService } from "../../../../src/modules/order/services/DeleteOrderService";

describe("DeleteOrderController", () => {
  let controller: DeleteOrderController;
  let transformer: jest.Mocked<DeleteOrderTransformer>;
  let service: jest.Mocked<DeleteOrderService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new DeleteOrderController(transformer, service);
  });
  
  it("deve chamar service e retornar 204 sem body", async () => {
    const inputDTO = {
  "id": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler({
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
