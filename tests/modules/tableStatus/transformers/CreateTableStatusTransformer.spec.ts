import { CreateTableStatusTransformer } from "../../../../src/modules/tableStatus/transformers/CreateTableStatusTransformer";

describe("CreateTableStatusTransformer", () => {
  let transformer: CreateTableStatusTransformer;

  beforeEach(() => {
    transformer = new CreateTableStatusTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "companyId": "fakeString",
  "userId": "fakeString",
  "status": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "companyId": "fakeString",
  "userId": "fakeString",
  "status": "fakeString"
});
  });
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = {
  "id": "fakeString"
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "id": "fakeString"
});
  });
});
