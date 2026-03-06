import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindByUrlCompanyController } from "../../../../src/modules/company/controllers/FindByUrlCompanyController";
import { FindByUrlCompanyTransformer } from "../../../../src/modules/company/transformers/FindByUrlCompanyTransformer";
import { FindByUrlCompanyService } from "../../../../src/modules/company/services/FindByUrlCompanyService";

describe("FindByUrlCompanyController", () => {
  let controller: FindByUrlCompanyController;
  let transformer: jest.Mocked<FindByUrlCompanyTransformer>;
  let service: jest.Mocked<FindByUrlCompanyService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindByUrlCompanyController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "url": "fakeString"
};
    const outputDTO = {
  "id": "fakeString",
  "name": "fakeString",
  "description": "fakeString",
  "url": "fakeString",
  "closed": true,
  "alert": "fakeString",
  "minOrderPrice": 123,
  "categoriesList": [
    {}
  ],
  "plan": [
    {}
  ],
  "stylization": {},
  "contacts": {},
  "socialMediasList": [
    {}
  ],
  "address": {},
  "workSchedule": [
    {}
  ],
  "paymentForms": [
    "fakeString"
  ]
};

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
  params: {
  "url": "fakeString"
}
} as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
