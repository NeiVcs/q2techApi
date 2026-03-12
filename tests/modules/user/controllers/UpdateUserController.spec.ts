import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { UpdateUserController } from "../../../../src/modules/user/controllers/UpdateUserController";
import { UpdateUserTransformer } from "../../../../src/modules/user/transformers/UpdateUserTransformer";
import { UpdateUserService } from "../../../../src/modules/user/services/UpdateUserService";

describe("UpdateUserController", () => {
  let controller: UpdateUserController;
  let transformer: jest.Mocked<UpdateUserTransformer>;
  let service: jest.Mocked<UpdateUserService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new UpdateUserController(transformer, service);
  });

  it("deve chamar service e retornar 204 sem body", async () => {
    const inputDTO = {
      "id": "fakeString",
      "name": "fakeString",
      "password": "fakeString",
      "email": "fakeString",
      "phoneNumber": "fakeString",
      "whatsapp": "fakeString",
      "active": true,
      "address": {},
      "companyDataList": [
        {}
      ],
      "lastLogin": "fakeString"
    };

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

    const result = await controller.handler({
      body: {
        "name": "fakeString",
        "password": "fakeString",
        "email": "fakeString",
        "phoneNumber": "fakeString",
        "whatsapp": "fakeString",
        "active": true,
        "address": {},
        "companyDataList": [
          {}
        ],
        "lastLogin": "fakeString"
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
