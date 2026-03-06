import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindByIdUserController } from "../../../../src/modules/user/controllers/FindByIdUserController";
import { FindByIdUserTransformer } from "../../../../src/modules/user/transformers/FindByIdUserTransformer";
import { FindByIdUserService } from "../../../../src/modules/user/services/FindByIdUserService";

describe("FindByIdUserController", () => {
  let controller: FindByIdUserController;
  let transformer: jest.Mocked<FindByIdUserTransformer>;
  let service: jest.Mocked<FindByIdUserService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindByIdUserController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "id": "fakeString"
};
    const outputDTO = {
  "id": "fakeString",
  "companyId": "fakeString",
  "name": "fakeString",
  "email": "fakeString",
  "cpf": "fakeString",
  "phoneNumber": "fakeString",
  "whatsapp": "fakeString",
  "position": "fakeString",
  "resource": "fakeString",
  "active": true,
  "address": {},
  "plan": {},
  "billing": [
    {}
  ],
  "lastLogin": "fakeString",
  "createdAt": "fakeString"
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
