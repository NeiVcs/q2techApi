import { CreateCompanyTransformer } from "../../../../src/modules/company/transformers/CreateCompanyTransformer";

describe("CreateCompanyTransformer", () => {
  let transformer: CreateCompanyTransformer;

  beforeEach(() => {
    transformer = new CreateCompanyTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
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
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
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
});
  });
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = {
  "id": "fakeString"
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "id": "fakeString"
});
  });
});
