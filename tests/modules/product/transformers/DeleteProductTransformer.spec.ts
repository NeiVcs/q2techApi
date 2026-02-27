import { DeleteProductTransformer } from "../../../../src/modules/product/transformers/DeleteProductTransformer";

describe("DeleteProductTransformer", () => {
  let transformer: DeleteProductTransformer;

  beforeEach(() => {
    transformer = new DeleteProductTransformer();
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
