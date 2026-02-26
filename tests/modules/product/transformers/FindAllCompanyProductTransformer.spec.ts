import { FindAllCompanyProductTransformer } from "../../../../src/modules/product/transformers/FindAllCompanyProductTransformer";

describe("FindAllCompanyProductTransformer", () => {
  let transformer: FindAllCompanyProductTransformer;

  beforeEach(() => {
    transformer = new FindAllCompanyProductTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  params: {
  "id": "fakeString"
},
  query: {
  "name": "fakeString",
  "category": "fakeString",
  "active": true,
  "isAdditional": true,
  "page": 123,
  "pageSize": 123
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "id": "fakeString",
  "name": "fakeString",
  "category": "fakeString",
  "active": true,
  "isAdditional": true,
  "page": 123,
  "pageSize": 123
});
  });
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = {
  "pagination": {},
  "items": [
    {}
  ]
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "pagination": {},
  "items": [
    {}
  ]
});
  });
});
