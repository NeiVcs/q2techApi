import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { CreateUserController } from "../../../../src/modules/user/controllers/CreateUserController";
import { CreateUserTransformer } from "../../../../src/modules/user/transformers/CreateUserTransformer";
import { CreateUserService } from "../../../../src/modules/user/services/CreateUserService";

describe("CreateUserController", () => {
  let controller: CreateUserController;
  let transformer: jest.Mocked<CreateUserTransformer>;
  let service: jest.Mocked<CreateUserService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new CreateUserController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "companyId": "fakeString",
  "name": "fakeString",
  "password": "fakeString",
  "cpf": "fakeString",
  "email": "fakeString",
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
    const outputDTO = {
  "id": "fakeString"
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  body: {
  "companyId": "fakeString",
  "name": "fakeString",
  "password": "fakeString",
  "cpf": "fakeString",
  "email": "fakeString",
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
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(201);
    expect(result).toEqual(outputDTO);
  });
});
