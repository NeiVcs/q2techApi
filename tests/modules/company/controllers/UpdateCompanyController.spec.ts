import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { UpdateCompanyController } from "../../../../src/modules/company/controllers/UpdateCompanyController";
import { UpdateCompanyTransformer } from "../../../../src/modules/company/transformers/UpdateCompanyTransformer";
import { UpdateCompanyService } from "../../../../src/modules/company/services/UpdateCompanyService";

describe("UpdateCompanyController", () => {
  let controller: UpdateCompanyController;
  let transformer: jest.Mocked<UpdateCompanyTransformer>;
  let service: jest.Mocked<UpdateCompanyService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new UpdateCompanyController(transformer, service);
  });
  
  it("deve chamar service e retornar 204 sem body", async () => {
    const inputDTO = {
  "id": "fakeString",
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

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(undefined as any);

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
