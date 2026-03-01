import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindTestController } from "../../../../src/modules/test/controllers/FindTestController";
import { FindTestTransformer } from "../../../../src/modules/test/transformers/FindTestTransformer";
import { FindTestService } from "../../../../src/modules/test/services/FindTestService";

describe("FindTestController", () => {
  let controller: FindTestController;
  let transformer: jest.Mocked<FindTestTransformer>;
  let service: jest.Mocked<FindTestService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindTestController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "page": 123,
  "pageSize": 123
};
    const outputDTO = {
  "pagination": {},
  "items": [
    {}
  ]
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  query: {
  "page": 123,
  "pageSize": 123
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
