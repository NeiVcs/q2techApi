import { DeleteAdditionalTransformer } from "../../../../src/modules/additional/transformers/DeleteAdditionalTransformer";

describe("DeleteAdditionalTransformer", () => {
  let transformer: DeleteAdditionalTransformer;

  beforeEach(() => {
    transformer = new DeleteAdditionalTransformer();
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
});
