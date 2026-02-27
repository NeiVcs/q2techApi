import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { FindByIdCompanyController } from "../../../../src/modules/company/controllers/FindByIdCompanyController";
import { FindByIdCompanyTransformer } from "../../../../src/modules/company/transformers/FindByIdCompanyTransformer";
import { FindByIdCompanyService } from "../../../../src/modules/company/services/FindByIdCompanyService";

describe("FindByIdCompanyController", () => {
  let controller: FindByIdCompanyController;
  let transformer: jest.Mocked<FindByIdCompanyTransformer>;
  let service: jest.Mocked<FindByIdCompanyService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new FindByIdCompanyController(transformer, service);
  });
  
  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
  "id": "fakeString"
};
    const outputDTO = {
  "id": "fakeString",
  "name": "fakeString",
  "description": "fakeString",
  "url": "fakeString",
  "closed": true,
  "alert": "fakeString",
  "minOrderPrice": "fakeString",
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
