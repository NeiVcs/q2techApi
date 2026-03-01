import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { DeleteProductController } from "../../../../src/modules/product/controllers/DeleteProductController";
import { DeleteProductTransformer } from "../../../../src/modules/product/transformers/DeleteProductTransformer";
import { DeleteProductService } from "../../../../src/modules/product/services/DeleteProductService";

describe("DeleteProductController", () => {
  let controller: DeleteProductController;
  let transformer: jest.Mocked<DeleteProductTransformer>;
  let service: jest.Mocked<DeleteProductService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new DeleteProductController(transformer, service);
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
