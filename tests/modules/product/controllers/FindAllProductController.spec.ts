import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindAllProductController } from "../../../../src/modules/product/controllers/FindAllProductController";
import { FindAllProductTransformer } from "../../../../src/modules/product/transformers/FindAllProductTransformer";
import { FindAllProductService } from "../../../../src/modules/product/services/FindAllProductService";

describe("FindAllProductController", () => {
  let controller: FindAllProductController;
  let transformer: jest.Mocked<FindAllProductTransformer>;
  let service: jest.Mocked<FindAllProductService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindAllProductController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {};
    const outputDTO = {
  "items": [
    {}
  ]
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
