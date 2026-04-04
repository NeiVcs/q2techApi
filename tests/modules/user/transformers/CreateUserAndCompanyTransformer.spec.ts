import { CreateUserAndCompanyTransformer } from "../../../../src/modules/user/transformers/CreateUserAndCompanyTransformer";

describe("CreateUserAndCompanyTransformer", () => {
  let transformer: CreateUserAndCompanyTransformer;

  beforeEach(() => {
    transformer = new CreateUserAndCompanyTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "user": {},
  "company": {}
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "user": {},
  "company": {}
});
  });
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = {
  "id": "fakeString"
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "id": "fakeString"
});
  });
});
