import { CreateUserTransformer } from "../../../../src/modules/user/transformers/CreateUserTransformer";

describe("CreateUserTransformer", () => {
  let transformer: CreateUserTransformer;

  beforeEach(() => {
    transformer = new CreateUserTransformer();
  });

  it("deve mapear corretamente fromApi", () => {
    const request: any = {
      body: {
        "name": "fakeString",
        "password": "fakeString",
        "taxId": "fakeString",
        "email": "fakeString",
        "phoneNumber": "fakeString",
        "whatsapp": "fakeString",
        "active": true,
        "address": {},
        "companyDataList": [
          {}
        ],
        "lastLogin": "fakeString",
        "createdAt": "fakeString"
      }
    };
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
      "name": "fakeString",
      "password": "fakeString",
      "taxId": "fakeString",
      "email": "fakeString",
      "phoneNumber": "fakeString",
      "whatsapp": "fakeString",
      "active": true,
      "address": {},
      "companyDataList": [
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
