import { RequestUserDeletionTransformer } from "../../../../src/modules/user/transformers/RequestUserDeletionTransformer";

describe("RequestUserDeletionTransformer", () => {
  let transformer: RequestUserDeletionTransformer;

  beforeEach(() => {
    transformer = new RequestUserDeletionTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "password": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "password": "fakeString"
});
  });
});
