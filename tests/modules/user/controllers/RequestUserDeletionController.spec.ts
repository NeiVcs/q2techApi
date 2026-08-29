import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { RequestUserDeletionController } from "../../../../src/modules/user/controllers/RequestUserDeletionController";
import { RequestUserDeletionTransformer } from "../../../../src/modules/user/transformers/RequestUserDeletionTransformer";
import { RequestUserDeletionService } from "../../../../src/modules/user/services/RequestUserDeletionService";

describe("RequestUserDeletionController", () => {
  let controller: RequestUserDeletionController;
  let transformer: jest.Mocked<RequestUserDeletionTransformer>;
  let service: jest.Mocked<RequestUserDeletionService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new RequestUserDeletionController(transformer, service);
  });
  
  it("deve chamar service e retornar 204 sem body", async () => {
    const inputDTO = {
  "password": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler({
  body: {
  "password": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(reply.code).toHaveBeenCalledWith(204);
    expect(result).toBeUndefined();
  });
});
