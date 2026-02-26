import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindByIdProductController } from "../../../../src/modules/product/controllers/FindByIdProductController";
import { FindByIdProductTransformer } from "../../../../src/modules/product/transformers/FindByIdProductTransformer";
import { FindByIdProductService } from "../../../../src/modules/product/services/FindByIdProductService";

describe("FindByIdProductController", () => {
  let controller: FindByIdProductController;
  let transformer: jest.Mocked<FindByIdProductTransformer>;
  let service: jest.Mocked<FindByIdProductService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindByIdProductController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "id": "fakeString"
};
    const outputDTO = {
  "id": "fakeString",
  "companyId": "fakeString",
  "name": "fakeString",
  "category": "fakeString",
  "description": "fakeString",
  "active": true,
  "isAdditional": true,
  "imgUrl": "fakeString",
  "price": 123,
  "previewPrice": 123,
  "additionalList": [
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
