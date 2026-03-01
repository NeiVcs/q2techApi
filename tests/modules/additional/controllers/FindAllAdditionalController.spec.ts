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
      "id": "fakeString",
      "companyId": "fakeString",
      "category": "fakeString",
      "name": "fakeString",
      "min": 123,
      "max": "fakeString",
      "productIdList": [
        "fakeString"
      ]
    };
    const outputDTO = {
      "items": [
        {}
      ]
    };

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
      query: {
        "id": "fakeString",
        "companyId": "fakeString",
        "category": "fakeString",
        "name": "fakeString",
        "min": 123,
        "max": "fakeString",
        "productIdList": [
          "fakeString"
        ]
      }
    } as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
