import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindByCompanyIdTableStatusController } from "../../../../src/modules/tableStatus/controllers/FindByCompanyIdTableStatusController";
import { FindByCompanyIdTableStatusTransformer } from "../../../../src/modules/tableStatus/transformers/FindByCompanyIdTableStatusTransformer";
import { FindByCompanyIdTableStatusService } from "../../../../src/modules/tableStatus/services/FindByCompanyIdTableStatusService";

describe("FindByCompanyIdTableStatusController", () => {
  let controller: FindByCompanyIdTableStatusController;
  let transformer: jest.Mocked<FindByCompanyIdTableStatusTransformer>;
  let service: jest.Mocked<FindByCompanyIdTableStatusService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindByCompanyIdTableStatusController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "companyId": "fakeString"
};
    const outputDTO = {
  "id": "fakeString",
  "companyId": "fakeString",
  "userId": "fakeString",
  "status": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  params: {
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
