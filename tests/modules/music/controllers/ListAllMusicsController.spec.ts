import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindAllMusicController } from "../../../../src/modules/music/controllers/FindAllMusicController";
import { FindAllMusicTransformer } from "../../../../src/modules/music/transformers/FindAllMusicTransformer";
import { FindAllMusicService } from "../../../../src/modules/music/services/FindAllMusicService";

describe("FindMusicsController", () => {
  let controller: FindAllMusicController;
  let transformer: jest.Mocked<FindAllMusicTransformer>;
  let service: jest.Mocked<FindAllMusicService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindAllMusicController(transformer, service);
  });

  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
      "status": "fakeString"
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
      query: {
        "status": "fakeString"
      }
    } as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
