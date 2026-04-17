import { FindByUserIdOrderTransformer } from "../../../../src/modules/order/transformers/FindByUserIdOrderTransformer";

describe("FindByUserIdOrderTransformer", () => {
  let transformer: FindByUserIdOrderTransformer;

  beforeEach(() => {
    transformer = new FindByUserIdOrderTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  params: {
  "companyId": "fakeString"
},
  query: {
  "userId": "fakeString",
  "status": "fakeString",
  "page": 123,
  "pageSize": 123
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "companyId": "fakeString",
  "userId": "fakeString",
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
