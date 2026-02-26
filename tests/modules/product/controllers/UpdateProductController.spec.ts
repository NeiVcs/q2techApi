import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { UpdateProductController } from "../../../../src/modules/product/controllers/UpdateProductController";
import { UpdateProductTransformer } from "../../../../src/modules/product/transformers/UpdateProductTransformer";
import { UpdateProductService } from "../../../../src/modules/product/services/UpdateProductService";

describe("UpdateProductController", () => {
  let controller: UpdateProductController;
  let transformer: jest.Mocked<UpdateProductTransformer>;
  let service: jest.Mocked<UpdateProductService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new UpdateProductController(transformer, service);
  });
  
  it("deve chamar service e retornar 204 sem body", async () => {
    const inputDTO = {
  "id": "fakeString",
  "companyId": "fakeString",
  "name": "fakeString",
  "category": "fakeString",
  "description": "fakeString",
  "active": true,
  "isProduct": true,
  "imgUrl": "fakeString",
  "price": 123,
  "previewPrice": 123,
  "ProductIdList": [
    "fakeString"
  ]
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler({
  body: {
  "companyId": "fakeString",
  "name": "fakeString",
  "category": "fakeString",
  "description": "fakeString",
  "active": true,
  "isProduct": true,
  "imgUrl": "fakeString",
  "price": 123,
  "previewPrice": 123,
  "ProductIdList": [
    "fakeString"
  ]
},
  params: {
  "id": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(reply.code).toHaveBeenCalledWith(204);
    expect(result).toBeUndefined();
  });
});
