import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { DeleteCompanyController } from "../../../../src/modules/company/controllers/DeleteCompanyController";
import { DeleteCompanyTransformer } from "../../../../src/modules/company/transformers/DeleteCompanyTransformer";
import { DeleteCompanyService } from "../../../../src/modules/company/services/DeleteCompanyService";

describe("DeleteCompanyController", () => {
  let controller: DeleteCompanyController;
  let transformer: jest.Mocked<DeleteCompanyTransformer>;
  let service: jest.Mocked<DeleteCompanyService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new DeleteCompanyController(transformer, service);
  });
  
  it("deve chamar service e retornar 204 sem body", async () => {
    const inputDTO = {
  "id": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler({
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
