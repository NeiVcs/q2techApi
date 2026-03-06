import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { AuthController } from "../../../../src/modules/auth/controllers/AuthController";
import { AuthTransformer } from "../../../../src/modules/auth/transformers/AuthTransformer";
import { AuthService } from "../../../../src/modules/auth/services/AuthService";

describe("AuthController", () => {
  let controller: AuthController;
  let transformer: jest.Mocked<AuthTransformer>;
  let service: jest.Mocked<AuthService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new AuthController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "email": "fakeString",
  "password": "fakeString"
};
    const outputDTO = {
  "token": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  body: {
  "email": "fakeString",
  "password": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
