import { DeleteImageTransformer } from "../../../../src/modules/cloudinary/transformers/DeleteImageTransformer";

describe("DeleteImageTransformer", () => {
  let transformer: DeleteImageTransformer;

  beforeEach(() => {
    transformer = new DeleteImageTransformer();
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
