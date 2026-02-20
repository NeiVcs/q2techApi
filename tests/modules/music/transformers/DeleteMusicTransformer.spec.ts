import { DeleteMusicTransformer } from "../../../../src/modules/music/transformers/DeleteMusicTransformer";

describe("DeleteMusicTransformer", () => {
  let transformer: DeleteMusicTransformer;

  beforeEach(() => {
    transformer = new DeleteMusicTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "id": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "id": "fakeString"
});
  });
});
