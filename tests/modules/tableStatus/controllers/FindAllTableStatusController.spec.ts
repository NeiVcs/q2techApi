import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindAllTableStatusController } from "../../../../src/modules/tableStatus/controllers/FindAllTableStatusController";
import { FindAllTableStatusTransformer } from "../../../../src/modules/tableStatus/transformers/FindAllTableStatusTransformer";
import { FindAllTableStatusService } from "../../../../src/modules/tableStatus/services/FindAllTableStatusService";

describe("FindAllTableStatusController", () => {
  let controller: FindAllTableStatusController;
  let transformer: jest.Mocked<FindAllTableStatusTransformer>;
  let service: jest.Mocked<FindAllTableStatusService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindAllTableStatusController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {};
    const outputDTO = {
  "items": [
    {}
  ]
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
