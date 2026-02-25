import { CreateProductTransformer } from "../../../../src/modules/product/transformers/CreateProductTransformer";

describe("CreateProductTransformer", () => {
  let transformer: CreateProductTransformer;

  beforeEach(() => {
    transformer = new CreateProductTransformer();
  });

  it("deve mapear corretamente fromApi", () => {
    const request: any = {
      body: {
        "companyId": "fakeString",
        "name": "fakeString",
        "category": "fakeString",
        "description": "fakeString",
        "imgUrl": "fakeString",
        "price": 123,
        "previewPrice": 123,
        "additionalIdList": "fakeString"
      }
    };
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
      "companyId": "fakeString",
      "name": "fakeString",
      "category": "fakeString",
      "description": "fakeString",
      "imgUrl": "fakeString",
      "price": 123,
      "previewPrice": 123,
      "additionalIdList": "fakeString"
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
