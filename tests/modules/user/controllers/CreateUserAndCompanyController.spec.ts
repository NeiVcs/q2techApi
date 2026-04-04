import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { CreateUserAndCompanyController } from "../../../../src/modules/user/controllers/CreateUserAndCompanyController";
import { CreateUserAndCompanyTransformer } from "../../../../src/modules/user/transformers/CreateUserAndCompanyTransformer";
import { CreateUserAndCompanyService } from "../../../../src/modules/user/services/CreateUserAndCompanyService";

describe("CreateUserAndCompanyController", () => {
  let controller: CreateUserAndCompanyController;
  let transformer: jest.Mocked<CreateUserAndCompanyTransformer>;
  let service: jest.Mocked<CreateUserAndCompanyService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new CreateUserAndCompanyController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "user": {},
  "company": {}
};
    const outputDTO = {
  "id": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  body: {
  "user": {},
  "company": {}
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(result).toEqual(outputDTO);
  });
});
