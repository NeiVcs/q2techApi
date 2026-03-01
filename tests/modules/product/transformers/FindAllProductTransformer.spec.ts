import { FindAllProductTransformer } from "../../../../src/modules/product/transformers/FindAllProductTransformer";

describe("FindAllProductTransformer", () => {
  let transformer: FindAllProductTransformer;

  beforeEach(() => {
    transformer = new FindAllProductTransformer();
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
