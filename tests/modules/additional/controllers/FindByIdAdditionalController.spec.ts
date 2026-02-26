import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindByIdAdditionalController } from "../../../../src/modules/additional/controllers/FindByIdAdditionalController";
import { FindByIdAdditionalTransformer } from "../../../../src/modules/additional/transformers/FindByIdAdditionalTransformer";
import { FindByIdAdditionalService } from "../../../../src/modules/additional/services/FindByIdAdditionalService";

describe("FindByIdAdditionalController", () => {
  let controller: FindByIdAdditionalController;
  let transformer: jest.Mocked<FindByIdAdditionalTransformer>;
  let service: jest.Mocked<FindByIdAdditionalService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindByIdAdditionalController(transformer, service);
  });

  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
      "id": "fakeString"
    };
    const outputDTO = {
      "id": "fakeString",
      "companyId": "fakeString",
      "category": "fakeString",
      "name": "fakeString",
      "min": "fakeString",
      "max": "fakeString",
      "productIdList": [
        "fakeString"
      ]
    };

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
      params: {
        "id": "fakeString"
      }
    } as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
