import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindAllImagesController } from "../../../../src/modules/cloudinary/controllers/FindAllImagesController";
import { FindAllImagesTransformer } from "../../../../src/modules/cloudinary/transformers/FindAllImagesTransformer";
import { FindAllImagesService } from "../../../../src/modules/cloudinary/services/FindAllImagesService";

describe("FindAllImagesController", () => {
  let controller: FindAllImagesController;
  let transformer: jest.Mocked<FindAllImagesTransformer>;
  let service: jest.Mocked<FindAllImagesService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindAllImagesController(transformer, service);
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
