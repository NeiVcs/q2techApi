import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { RefreshTokenController } from "../../../../src/modules/auth/controllers/RefreshTokenController";
import { RefreshTokenTransformer } from "../../../../src/modules/auth/transformers/RefreshTokenTransformer";
import { RefreshTokenService } from "../../../../src/modules/auth/services/RefreshTokenService";

describe("RefreshTokenController", () => {
  let controller: RefreshTokenController;
  let transformer: jest.Mocked<RefreshTokenTransformer>;
  let service: jest.Mocked<RefreshTokenService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new RefreshTokenController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "token": "fakeString"
};
    const outputDTO = {
  "token": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  body: {
  "token": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
