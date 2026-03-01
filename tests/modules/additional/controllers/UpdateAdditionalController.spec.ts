import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { UpdateAdditionalController } from "../../../../src/modules/additional/controllers/UpdateAdditionalController";
import { UpdateAdditionalTransformer } from "../../../../src/modules/additional/transformers/UpdateAdditionalTransformer";
import { UpdateAdditionalService } from "../../../../src/modules/additional/services/UpdateAdditionalService";

describe("UpdateAdditionalController", () => {
  let controller: UpdateAdditionalController;
  let transformer: jest.Mocked<UpdateAdditionalTransformer>;
  let service: jest.Mocked<UpdateAdditionalService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new UpdateAdditionalController(transformer, service);
  });

  it("deve chamar service e retornar 204 sem body", async () => {
    const inputDTO = {
      "id": "fakeString",
      "companyId": "fakeString",
      "category": "fakeString",
      "name": "fakeString",
      "min": 123,
      "max": 123,
      "productIdList": [
        "fakeString"
      ]
    };

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler({
      body: {
        "companyId": "fakeString",
        "category": "fakeString",
        "name": "fakeString",
        "min": 123,
        "max": 123,
        "productIdList": [
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
