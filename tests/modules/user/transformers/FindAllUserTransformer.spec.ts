import { FindAllUserTransformer } from "../../../../src/modules/user/transformers/FindAllUserTransformer";

describe("FindAllUserTransformer", () => {
  let transformer: FindAllUserTransformer;

  beforeEach(() => {
    transformer = new FindAllUserTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  query: {
  "page": 123,
  "pageSize": 123,
  "companyId": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "page": 123,
  "pageSize": 123,
  "companyId": "fakeString"
});
  });
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = {
  "pagination": {},
  "items": [
    {}
  ]
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "pagination": {},
  "items": [
    {}
  ]
});
  });
});
