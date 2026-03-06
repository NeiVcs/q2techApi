import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { DeleteUserController } from "../../../../src/modules/user/controllers/DeleteUserController";
import { DeleteUserTransformer } from "../../../../src/modules/user/transformers/DeleteUserTransformer";
import { DeleteUserService } from "../../../../src/modules/user/services/DeleteUserService";

describe("DeleteUserController", () => {
  let controller: DeleteUserController;
  let transformer: jest.Mocked<DeleteUserTransformer>;
  let service: jest.Mocked<DeleteUserService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new DeleteUserController(transformer, service);
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
