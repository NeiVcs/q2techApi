import { FindByIdMusicTransformer } from "../../../../src/modules/music/transformers/FindByIdMusicTransformer";

describe("FindByIdMusicTransformer", () => {
  let transformer: FindByIdMusicTransformer;

  beforeEach(() => {
    transformer = new FindByIdMusicTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  params: {
  "id": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "id": "fakeString"
});
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
