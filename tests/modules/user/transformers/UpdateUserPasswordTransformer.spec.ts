import { UpdateUserPasswordTransformer } from "../../../../src/modules/user/transformers/UpdateUserPasswordTransformer";

describe("UpdateUserPasswordTransformer", () => {
  let transformer: UpdateUserPasswordTransformer;

  beforeEach(() => {
    transformer = new UpdateUserPasswordTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "email": "fakeString",
  "password": "fakeString",
  "newPassword": "fakeString",
  "code": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "email": "fakeString",
  "password": "fakeString",
  "newPassword": "fakeString",
  "code": "fakeString"
});
  });
});
