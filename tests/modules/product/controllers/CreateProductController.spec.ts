import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { CreateProductController } from "../../../../src/modules/product/controllers/CreateProductController";
import { CreateProductTransformer } from "../../../../src/modules/product/transformers/CreateProductTransformer";
import { CreateProductService } from "../../../../src/modules/product/services/CreateProductService";

describe("CreateProductController", () => {
  let controller: CreateProductController;
  let transformer: jest.Mocked<CreateProductTransformer>;
  let service: jest.Mocked<CreateProductService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new CreateProductController(transformer, service);
  });

  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
      "storeId": "fakeString",
      "name": "fakeString",
      "category": "fakeString",
      "description": "fakeString",
      "imgUrl": "fakeString",
      "price": 123,
      "previewPrice": 123,
      "additionalListId": "fakeString"
    };
    const outputDTO = {
      "id": "fakeString"
    };

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
      body: {
        "storeId": "fakeString",
        "name": "fakeString",
        "category": "fakeString",
        "description": "fakeString",
        "imgUrl": "fakeString",
        "price": 123,
        "previewPrice": 123,
        "additionalListId": "fakeString"
      }
    } as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(result).toEqual(outputDTO);
  });
});
