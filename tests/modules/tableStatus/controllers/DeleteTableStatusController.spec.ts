import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { DeleteTableStatusController } from "../../../../src/modules/tableStatus/controllers/DeleteTableStatusController";
import { DeleteTableStatusTransformer } from "../../../../src/modules/tableStatus/transformers/DeleteTableStatusTransformer";
import { DeleteTableStatusService } from "../../../../src/modules/tableStatus/services/DeleteTableStatusService";

describe("DeleteTableStatusController", () => {
  let controller: DeleteTableStatusController;
  let transformer: jest.Mocked<DeleteTableStatusTransformer>;
  let service: jest.Mocked<DeleteTableStatusService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new DeleteTableStatusController(transformer, service);
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
