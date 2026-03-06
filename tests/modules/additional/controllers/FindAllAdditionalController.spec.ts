import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindAllAdditionalController } from "../../../../src/modules/additional/controllers/FindAllAdditionalController";
import { FindAllAdditionalTransformer } from "../../../../src/modules/additional/transformers/FindAllAdditionalTransformer";
import { FindAllAdditionalService } from "../../../../src/modules/additional/services/FindAllAdditionalService";

describe("FindAllAdditionalController", () => {
  let controller: FindAllAdditionalController;
  let transformer: jest.Mocked<FindAllAdditionalTransformer>;
  let service: jest.Mocked<FindAllAdditionalService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindAllAdditionalController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "page": 123,
  "pageSize": 123,
  "companyId": "fakeString"
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
  "pageSize": 123,
  "companyId": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
