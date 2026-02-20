import { UpdateMusicTransformer } from "../../../../src/modules/music/transformers/UpdateMusicTransformer";

describe("UpdateMusicTransformer", () => {
  let transformer: UpdateMusicTransformer;

  beforeEach(() => {
    transformer = new UpdateMusicTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "id": "fakeString",
  "name": "fakeString",
  "category": "fakeString",
  "artist": "fakeString",
  "gender": "fakeString",
  "link": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "id": "fakeString",
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
