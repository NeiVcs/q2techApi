import { CreateUserTransformer } from "../../../../src/modules/user/transformers/CreateUserTransformer";

describe("CreateUserTransformer", () => {
  let transformer: CreateUserTransformer;

  beforeEach(() => {
    transformer = new CreateUserTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "companyId": "fakeString",
  "name": "fakeString",
  "password": "fakeString",
  "cpf": "fakeString",
  "email": "fakeString",
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
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "companyId": "fakeString",
  "name": "fakeString",
  "password": "fakeString",
  "cpf": "fakeString",
  "email": "fakeString",
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
