import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { CreateCompanyController } from "../../../../src/modules/company/controllers/CreateCompanyController";
import { CreateCompanyTransformer } from "../../../../src/modules/company/transformers/CreateCompanyTransformer";
import { CreateCompanyService } from "../../../../src/modules/company/services/CreateCompanyService";

describe("CreateCompanyController", () => {
  let controller: CreateCompanyController;
  let transformer: jest.Mocked<CreateCompanyTransformer>;
  let service: jest.Mocked<CreateCompanyService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new CreateCompanyController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "name": "fakeString",
  "description": "fakeString",
  "url": "fakeString",
  "closed": true,
  "alert": "fakeString",
  "minOderPrice": 123,
  "categoriesList": [
    {}
  ],
  "plan": [
    {}
  ],
  "stylization": {},
  "contacts": {},
  "address": {},
  "workSchedule": [
    {}
  ],
  "paymentForms": [
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
  "name": "fakeString",
  "description": "fakeString",
  "url": "fakeString",
  "closed": true,
  "alert": "fakeString",
  "minOderPrice": 123,
  "categoriesList": [
    {}
  ],
  "plan": [
    {}
  ],
  "stylization": {},
  "contacts": {},
  "address": {},
  "workSchedule": [
    {}
  ],
  "paymentForms": [
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
