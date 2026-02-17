import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { ListAllMusicsController } from "../../../../src/modules/musics/controllers/ListAllMusicsController";
import { ListAllMusicsTransformer } from "../../../../src/modules/musics/transformers/ListAllMusicsTransformer";
import { ListAllMusicsService } from "../../../../src/modules/musics/services/ListAllMusicsService";

describe("ListAllMusicsController", () => {
  let controller: ListAllMusicsController;
  let transformer: jest.Mocked<ListAllMusicsTransformer>;
  let service: jest.Mocked<ListAllMusicsService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new ListAllMusicsController(transformer, service);
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
