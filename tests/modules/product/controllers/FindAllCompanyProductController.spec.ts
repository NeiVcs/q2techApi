import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindAllCompanyProductController } from "../../../../src/modules/product/controllers/FindAllCompanyProductController";
import { FindAllCompanyProductTransformer } from "../../../../src/modules/product/transformers/FindAllCompanyProductTransformer";
import { FindAllCompanyProductService } from "../../../../src/modules/product/services/FindAllCompanyProductService";

describe("FindAllCompanyProductController", () => {
  let controller: FindAllCompanyProductController;
  let transformer: jest.Mocked<FindAllCompanyProductTransformer>;
  let service: jest.Mocked<FindAllCompanyProductService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindAllCompanyProductController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "id": "fakeString",
  "name": "fakeString",
  "category": "fakeString",
  "active": true,
  "isAdditional": true,
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
  params: {
  "id": "fakeString"
},
  query: {
  "name": "fakeString",
  "category": "fakeString",
  "active": true,
  "isAdditional": true,
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
