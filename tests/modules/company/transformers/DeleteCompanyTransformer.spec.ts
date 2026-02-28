import { DeleteCompanyTransformer } from "../../../../src/modules/company/transformers/DeleteCompanyTransformer";

describe("DeleteCompanyTransformer", () => {
  let transformer: DeleteCompanyTransformer;

  beforeEach(() => {
    transformer = new DeleteCompanyTransformer();
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
});
