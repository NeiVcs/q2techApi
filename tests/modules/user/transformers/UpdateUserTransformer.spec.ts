import { UpdateUserTransformer } from "../../../../src/modules/user/transformers/UpdateUserTransformer";

describe("UpdateUserTransformer", () => {
  let transformer: UpdateUserTransformer;

  beforeEach(() => {
    transformer = new UpdateUserTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "name": "fakeString",
  "password": "fakeString",
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
  "lastLogin": "fakeString"
},
  params: {
  "id": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "id": "fakeString",
  "name": "fakeString",
  "password": "fakeString",
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
  "lastLogin": "fakeString"
});
  });
});
