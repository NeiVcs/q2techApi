import { FindByCompanyIdTableStatusTransformer } from "../../../../src/modules/tableStatus/transformers/FindByCompanyIdTableStatusTransformer";

describe("FindByCompanyIdTableStatusTransformer", () => {
  let transformer: FindByCompanyIdTableStatusTransformer;

  beforeEach(() => {
    transformer = new FindByCompanyIdTableStatusTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  params: {
  "companyId": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "companyId": "fakeString"
});
  });
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = {
  "id": "fakeString",
  "companyId": "fakeString",
  "userId": "fakeString",
  "status": "fakeString"
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "id": "fakeString",
  "companyId": "fakeString",
  "userId": "fakeString",
  "status": "fakeString"
});
  });
});
