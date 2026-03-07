import { FindAllProductTransformer } from "../../../../src/modules/product/transformers/FindAllProductTransformer";

describe("FindAllProductTransformer", () => {
  let transformer: FindAllProductTransformer;

  beforeEach(() => {
    transformer = new FindAllProductTransformer();
  });

  it("deve mapear corretamente fromApi", () => {
    const request: any = {
      query: {
        "companyId": "fakeString",
        "name": "fakeString",
        "category": "fakeString",
        "active": true,
        "isAdditional": true,
        "page": 123,
        "pageSize": 123
      }
    };
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
      "companyId": "fakeString",
      "name": "fakeString",
      "category": "fakeString",
      "active": true,
      "isAdditional": true,
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
