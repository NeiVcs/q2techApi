import { DeleteUserTransformer } from "../../../../src/modules/user/transformers/DeleteUserTransformer";

describe("DeleteUserTransformer", () => {
  let transformer: DeleteUserTransformer;

  beforeEach(() => {
    transformer = new DeleteUserTransformer();
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
