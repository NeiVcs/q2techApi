import { DeleteOrderTransformer } from "../../../../src/modules/order/transformers/DeleteOrderTransformer";

describe("DeleteOrderTransformer", () => {
  let transformer: DeleteOrderTransformer;

  beforeEach(() => {
    transformer = new DeleteOrderTransformer();
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
