import { FindAllMusicTransformer } from "../../../../src/modules/music/transformers/FindAllMusicTransformer";

describe("FindAllMusicTransformer", () => {
  let transformer: FindAllMusicTransformer;

  beforeEach(() => {
    transformer = new FindAllMusicTransformer();
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
