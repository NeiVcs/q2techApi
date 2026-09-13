import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { CreateTableStatusController } from "../../../../src/modules/tableStatus/controllers/CreateTableStatusController";
import { CreateTableStatusTransformer } from "../../../../src/modules/tableStatus/transformers/CreateTableStatusTransformer";
import { CreateTableStatusService } from "../../../../src/modules/tableStatus/services/CreateTableStatusService";

describe("CreateTableStatusController", () => {
  let controller: CreateTableStatusController;
  let transformer: jest.Mocked<CreateTableStatusTransformer>;
  let service: jest.Mocked<CreateTableStatusService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new CreateTableStatusController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "companyId": "fakeString",
  "userId": "fakeString",
  "status": "fakeString"
};
    const outputDTO = {
  "id": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  body: {
  "companyId": "fakeString",
  "userId": "fakeString",
  "status": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(result).toEqual(outputDTO);
  });
});
