import { DeleteTableStatusTransformer } from "../../../../src/modules/tableStatus/transformers/DeleteTableStatusTransformer";

describe("DeleteTableStatusTransformer", () => {
  let transformer: DeleteTableStatusTransformer;

  beforeEach(() => {
    transformer = new DeleteTableStatusTransformer();
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
