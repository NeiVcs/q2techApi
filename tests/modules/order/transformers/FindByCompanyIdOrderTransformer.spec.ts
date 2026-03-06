import { FindByCompanyIdOrderTransformer } from "../../../../src/modules/order/transformers/FindByCompanyIdOrderTransformer";

describe("FindByCompanyIdOrderTransformer", () => {
  let transformer: FindByCompanyIdOrderTransformer;

  beforeEach(() => {
    transformer = new FindByCompanyIdOrderTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  params: {
  "companyId": "fakeString"
},
  query: {
  "status": "fakeString",
  "page": 123,
  "pageSize": 123
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "companyId": "fakeString",
  "status": "fakeString",
  "page": 123,
  "pageSize": 123
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
