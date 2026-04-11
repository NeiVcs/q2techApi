import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { UpdateUserPasswordController } from "../../../../src/modules/user/controllers/UpdateUserPasswordController";
import { UpdateUserPasswordTransformer } from "../../../../src/modules/user/transformers/UpdateUserPasswordTransformer";
import { UpdateUserPasswordService } from "../../../../src/modules/user/services/UpdateUserPasswordService";

describe("UpdateUserPasswordController", () => {
  let controller: UpdateUserPasswordController;
  let transformer: jest.Mocked<UpdateUserPasswordTransformer>;
  let service: jest.Mocked<UpdateUserPasswordService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new UpdateUserPasswordController(transformer, service);
  });
  
  it("deve chamar service e retornar 204 sem body", async () => {
    const inputDTO = {
  "email": "fakeString",
  "password": "fakeString",
  "newPassword": "fakeString",
  "code": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler({
  body: {
  "email": "fakeString",
  "password": "fakeString",
  "newPassword": "fakeString",
  "code": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(reply.code).toHaveBeenCalledWith(204);
    expect(result).toBeUndefined();
  });
});
