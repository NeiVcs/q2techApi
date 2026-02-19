import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { CreateMusicController } from "../../../../src/modules/music/controllers/CreateMusicController";
import { CreateMusicTransformer } from "../../../../src/modules/music/transformers/CreateMusicTransformer";
import { CreateMusicService } from "../../../../src/modules/music/services/CreateMusicService";

describe("CreateMusicController", () => {
  let controller: CreateMusicController;
  let transformer: jest.Mocked<CreateMusicTransformer>;
  let service: jest.Mocked<CreateMusicService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new CreateMusicController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "name": "fakeString",
  "category": "fakeString",
  "artist": "fakeString",
  "gender": "fakeString",
  "link": "fakeString"
};
    const outputDTO = {
  "id": "fakeString",
  "createdAt": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  body: {
  "name": "fakeString",
  "category": "fakeString",
  "artist": "fakeString",
  "gender": "fakeString",
  "link": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(result).toEqual(outputDTO);
  });
});
