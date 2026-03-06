import { AuthTransformer } from "../../../../src/modules/auth/transformers/AuthTransformer";

describe("AuthTransformer", () => {
  let transformer: AuthTransformer;

  beforeEach(() => {
    transformer = new AuthTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "email": "fakeString",
  "password": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "email": "fakeString",
  "password": "fakeString"
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
