import { ListAllMusicsTransformer } from "../../../../src/modules/musics/transformers/ListAllMusicsTransformer";

describe("ListAllMusicsTransformer", () => {
  let transformer: ListAllMusicsTransformer;

  beforeEach(() => {
    transformer = new ListAllMusicsTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  query: {
  "status": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "status": "fakeString"
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
