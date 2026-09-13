import { FindAllTableStatusTransformer } from "../../../../src/modules/tableStatus/transformers/FindAllTableStatusTransformer";

describe("FindAllTableStatusTransformer", () => {
  let transformer: FindAllTableStatusTransformer;

  beforeEach(() => {
    transformer = new FindAllTableStatusTransformer();
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
