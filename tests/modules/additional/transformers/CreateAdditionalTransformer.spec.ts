import { CreateAdditionalTransformer } from "../../../../src/modules/additional/transformers/CreateAdditionalTransformer";

describe("CreateAdditionalTransformer", () => {
  let transformer: CreateAdditionalTransformer;

  beforeEach(() => {
    transformer = new CreateAdditionalTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "companyId": "fakeString",
  "category": "fakeString",
  "name": "fakeString",
  "min": 123,
  "max": 123,
  "productList": [
    "fakeString"
  ]
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "companyId": "fakeString",
  "category": "fakeString",
  "name": "fakeString",
  "min": 123,
  "max": 123,
  "productList": [
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
