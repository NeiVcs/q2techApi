import { UpdateCompanyTransformer } from "../../../../src/modules/company/transformers/UpdateCompanyTransformer";

describe("UpdateCompanyTransformer", () => {
  let transformer: UpdateCompanyTransformer;

  beforeEach(() => {
    transformer = new UpdateCompanyTransformer();
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
},
  params: {
  "id": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
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
});
  });
});
