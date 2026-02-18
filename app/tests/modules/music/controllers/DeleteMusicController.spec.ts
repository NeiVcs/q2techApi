import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { DeleteMusicController } from "../../../../src/modules/music/controllers/DeleteMusicController";
import { DeleteMusicTransformer } from "../../../../src/modules/music/transformers/DeleteMusicTransformer";
import { DeleteMusicService } from "../../../../src/modules/music/services/DeleteMusicService";

describe("DeleteMusicController", () => {
  let controller: DeleteMusicController;
  let transformer: jest.Mocked<DeleteMusicTransformer>;
  let service: jest.Mocked<DeleteMusicService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new DeleteMusicController(transformer, service);
  });
  
  it("deve chamar service e retornar 204 sem body", async () => {
    const inputDTO = {
  "id": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler({
  body: {
  "id": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(reply.code).toHaveBeenCalledWith(204);
    expect(result).toBeUndefined();
  });
});
