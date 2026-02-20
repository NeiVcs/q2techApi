import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindByIdMusicController } from "../../../../src/modules/music/controllers/FindByIdMusicController";
import { FindByIdMusicTransformer } from "../../../../src/modules/music/transformers/FindByIdMusicTransformer";
import { FindByIdMusicService } from "../../../../src/modules/music/services/FindByIdMusicService";

describe("FindByIdMusicController", () => {
  let controller: FindByIdMusicController;
  let transformer: jest.Mocked<FindByIdMusicTransformer>;
  let service: jest.Mocked<FindByIdMusicService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindByIdMusicController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "id": "fakeString"
};
    const outputDTO = {
  "items": [
    {}
  ]
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  params: {
  "id": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
