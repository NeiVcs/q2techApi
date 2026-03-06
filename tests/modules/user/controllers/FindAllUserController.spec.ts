import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindAllUserController } from "../../../../src/modules/user/controllers/FindAllUserController";
import { FindAllUserTransformer } from "../../../../src/modules/user/transformers/FindAllUserTransformer";
import { FindAllUserService } from "../../../../src/modules/user/services/FindAllUserService";

describe("FindAllUserController", () => {
  let controller: FindAllUserController;
  let transformer: jest.Mocked<FindAllUserTransformer>;
  let service: jest.Mocked<FindAllUserService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindAllUserController(transformer, service);
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
