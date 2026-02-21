import { FindByIdAdditionalTransformer } from "../../../../src/modules/additional/transformers/FindByIdAdditionalTransformer";

describe("FindByIdAdditionalTransformer", () => {
  let transformer: FindByIdAdditionalTransformer;

  beforeEach(() => {
    transformer = new FindByIdAdditionalTransformer();
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
  "name": "fakeString",
  "min": "fakeString",
  "max": "fakeString",
  "productIdList": [
    "fakeString"
  ]
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "id": "fakeString",
  "name": "fakeString",
  "min": "fakeString",
  "max": "fakeString",
  "productIdList": [
    "fakeString"
  ]
});
  });
});
