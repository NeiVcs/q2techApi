import { UpdateAdditionalTransformer } from "../../../../src/modules/additional/transformers/UpdateAdditionalTransformer";

describe("UpdateAdditionalTransformer", () => {
  let transformer: UpdateAdditionalTransformer;

  beforeEach(() => {
    transformer = new UpdateAdditionalTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "name": "fakeString",
  "min": 123,
  "max": 123,
  "productIdList": [
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
  "min": 123,
  "max": 123,
  "productIdList": [
    "fakeString"
  ]
});
  });
});
