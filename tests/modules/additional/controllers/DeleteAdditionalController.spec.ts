import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { DeleteAdditionalController } from "../../../../src/modules/additional/controllers/DeleteAdditionalController";
import { DeleteAdditionalTransformer } from "../../../../src/modules/additional/transformers/DeleteAdditionalTransformer";
import { DeleteAdditionalService } from "../../../../src/modules/additional/services/DeleteAdditionalService";

describe("DeleteAdditionalController", () => {
  let controller: DeleteAdditionalController;
  let transformer: jest.Mocked<DeleteAdditionalTransformer>;
  let service: jest.Mocked<DeleteAdditionalService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new DeleteAdditionalController(transformer, service);
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
