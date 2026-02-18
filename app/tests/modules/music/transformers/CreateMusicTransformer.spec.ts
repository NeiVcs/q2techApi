import { CreateMusicTransformer } from "../../../../src/modules/music/transformers/CreateMusicTransformer";

describe("CreateMusicTransformer", () => {
  let transformer: CreateMusicTransformer;

  beforeEach(() => {
    transformer = new CreateMusicTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "name": "fakeString",
  "category": "fakeString",
  "artist": "fakeString",
  "gender": "fakeString",
  "link": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "name": "fakeString",
  "category": "fakeString",
  "artist": "fakeString",
  "gender": "fakeString",
  "link": "fakeString"
});
  });
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = {
  "id": "fakeString",
  "createdAt": "fakeString"
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "id": "fakeString",
  "createdAt": "fakeString"
});
  });
});
