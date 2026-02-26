import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { CreateAdditionalController } from "../../../../src/modules/additional/controllers/CreateAdditionalController";
import { CreateAdditionalTransformer } from "../../../../src/modules/additional/transformers/CreateAdditionalTransformer";
import { CreateAdditionalService } from "../../../../src/modules/additional/services/CreateAdditionalService";

describe("CreateAdditionalController", () => {
  let controller: CreateAdditionalController;
  let transformer: jest.Mocked<CreateAdditionalTransformer>;
  let service: jest.Mocked<CreateAdditionalService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new CreateAdditionalController(transformer, service);
  });

  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
      "companyId": "fakeString",
      "category": "fakeString",
      "name": "fakeString",
      "min": 123,
      "max": 123,
      "productIdList": [
        "fakeString"
      ]
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
        "category": "fakeString",
        "name": "fakeString",
        "min": 123,
        "max": 123,
        "productIdList": [
          "fakeString"
        ]
      }
    } as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(result).toEqual(outputDTO);
  });
});
