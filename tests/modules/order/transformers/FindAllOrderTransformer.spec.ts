import { FindAllOrderTransformer } from "../../../../src/modules/order/transformers/FindAllOrderTransformer";

describe("FindAllOrderTransformer", () => {
  let transformer: FindAllOrderTransformer;

  beforeEach(() => {
    transformer = new FindAllOrderTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  query: {
  "companyId": "fakeString",
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
