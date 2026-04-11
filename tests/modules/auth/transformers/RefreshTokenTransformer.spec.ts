import { RefreshTokenTransformer } from "../../../../src/modules/auth/transformers/RefreshTokenTransformer";

describe("RefreshTokenTransformer", () => {
  let transformer: RefreshTokenTransformer;

  beforeEach(() => {
    transformer = new RefreshTokenTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "token": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "token": "fakeString"
});
  });
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = {
  "token": "fakeString"
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "token": "fakeString"
});
  });
});
