import { RequestUserDeletionTransformer } from "../../../../src/modules/company/transformers/RequestUserDeletionTransformer";

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
