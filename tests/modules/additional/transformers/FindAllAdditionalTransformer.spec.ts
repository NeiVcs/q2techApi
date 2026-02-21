import { FindAllAdditionalTransformer } from "../../../../src/modules/additional/transformers/FindAllAdditionalTransformer";

describe("FindAllAdditionalTransformer", () => {
  let transformer: FindAllAdditionalTransformer;

  beforeEach(() => {
    transformer = new FindAllAdditionalTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  query: {
  "id": "fakeString",
  "name": "fakeString",
  "min": 123,
  "max": "fakeString",
  "productIdList": [
    "fakeString"
  ]
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "id": "fakeString",
  "name": "fakeString",
  "min": 123,
  "max": "fakeString",
  "productIdList": [
    "fakeString"
  ]
});
  });
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = {
  "items": [
    {}
  ]
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "items": [
    {}
  ]
});
  });
});
