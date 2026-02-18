import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { UpdateMusicController } from "../../../../src/modules/music/controllers/UpdateMusicController";
import { UpdateMusicTransformer } from "../../../../src/modules/music/transformers/UpdateMusicTransformer";
import { UpdateMusicService } from "../../../../src/modules/music/services/UpdateMusicService";

describe("UpdateMusicController", () => {
  let controller: UpdateMusicController;
  let transformer: jest.Mocked<UpdateMusicTransformer>;
  let service: jest.Mocked<UpdateMusicService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new UpdateMusicController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "id": "fakeString",
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
  "id": "fakeString",
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
