import { FindTablesOrderTransformer } from "../../../../src/modules/order/transformers/FindTablesOrderTransformer";

describe("FindTablesOrderTransformer", () => {
  let transformer: FindTablesOrderTransformer;

  beforeEach(() => {
    transformer = new FindTablesOrderTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({});
  });
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = {
  "items": [
    {}
  ]
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "items": [
    {}
  ]
});
  });
});
