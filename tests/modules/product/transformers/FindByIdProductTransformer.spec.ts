import { FindByIdProductTransformer } from "../../../../src/modules/product/transformers/FindByIdProductTransformer";

describe("FindByIdProductTransformer", () => {
  let transformer: FindByIdProductTransformer;

  beforeEach(() => {
    transformer = new FindByIdProductTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  params: {
  "id": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "id": "fakeString"
});
  });
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = {
  "id": "fakeString",
  "companyId": "fakeString",
  "name": "fakeString",
  "category": "fakeString",
  "description": "fakeString",
  "active": true,
  "isAdditional": true,
  "imgUrl": "fakeString",
  "price": 123,
  "previewPrice": 123,
  "additionalList": [
    {}
  ]
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "id": "fakeString",
  "companyId": "fakeString",
  "name": "fakeString",
  "category": "fakeString",
  "description": "fakeString",
  "active": true,
  "isAdditional": true,
  "imgUrl": "fakeString",
  "price": 123,
  "previewPrice": 123,
  "additionalList": [
    {}
  ]
});
  });
});
