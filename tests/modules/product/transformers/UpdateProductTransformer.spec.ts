import { UpdateProductTransformer } from "../../../../src/modules/product/transformers/UpdateProductTransformer";

describe("UpdateProductTransformer", () => {
  let transformer: UpdateProductTransformer;

  beforeEach(() => {
    transformer = new UpdateProductTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "companyId": "fakeString",
  "name": "fakeString",
  "category": "fakeString",
  "description": "fakeString",
  "active": true,
  "isProduct": true,
  "imgUrl": "fakeString",
  "price": 123,
  "previewPrice": 123,
  "ProductIdList": [
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
  "companyId": "fakeString",
  "name": "fakeString",
  "category": "fakeString",
  "description": "fakeString",
  "active": true,
  "isProduct": true,
  "imgUrl": "fakeString",
  "price": 123,
  "previewPrice": 123,
  "ProductIdList": [
    "fakeString"
  ]
});
  });
});
