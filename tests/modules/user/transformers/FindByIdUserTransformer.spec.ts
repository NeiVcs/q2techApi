import { FindByIdUserTransformer } from "../../../../src/modules/user/transformers/FindByIdUserTransformer";

describe("FindByIdUserTransformer", () => {
  let transformer: FindByIdUserTransformer;

  beforeEach(() => {
    transformer = new FindByIdUserTransformer();
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
  "id": "fakeString",
  "companyId": "fakeString",
  "name": "fakeString",
  "email": "fakeString",
  "cpf": "fakeString",
  "phoneNumber": "fakeString",
  "whatsapp": "fakeString",
  "position": "fakeString",
  "resource": "fakeString",
  "active": true,
  "address": {},
  "plan": {},
  "billing": [
    {}
  ],
  "lastLogin": "fakeString",
  "createdAt": "fakeString"
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "id": "fakeString",
  "companyId": "fakeString",
  "name": "fakeString",
  "email": "fakeString",
  "cpf": "fakeString",
  "phoneNumber": "fakeString",
  "whatsapp": "fakeString",
  "position": "fakeString",
  "resource": "fakeString",
  "active": true,
  "address": {},
  "plan": {},
  "billing": [
    {}
  ],
  "lastLogin": "fakeString",
  "createdAt": "fakeString"
});
  });
});
