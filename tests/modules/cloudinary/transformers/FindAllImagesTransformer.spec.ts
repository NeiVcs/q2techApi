import { FindAllImagesTransformer } from "../../../../src/modules/cloudinary/transformers/FindAllImagesTransformer";

describe("FindAllImagesTransformer", () => {
  let transformer: FindAllImagesTransformer;

  beforeEach(() => {
    transformer = new FindAllImagesTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  query: {
  "page": 123,
  "pageSize": 123
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
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
