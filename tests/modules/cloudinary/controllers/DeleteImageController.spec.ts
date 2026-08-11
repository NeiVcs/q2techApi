import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { DeleteImageController } from "../../../../src/modules/cloudinary/controllers/DeleteImageController";
import { DeleteImageTransformer } from "../../../../src/modules/cloudinary/transformers/DeleteImageTransformer";
import { DeleteImageService } from "../../../../src/modules/cloudinary/services/DeleteImageService";

describe("DeleteImageController", () => {
  let controller: DeleteImageController;
  let transformer: jest.Mocked<DeleteImageTransformer>;
  let service: jest.Mocked<DeleteImageService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new DeleteImageController(transformer, service);
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
