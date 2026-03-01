import { FindByIdOrderTransformer } from "../../../../src/modules/order/transformers/FindByIdOrderTransformer";

describe("FindByIdOrderTransformer", () => {
  let transformer: FindByIdOrderTransformer;

  beforeEach(() => {
    transformer = new FindByIdOrderTransformer();
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
  "status": "fakeString",
  "paymentForm": "fakeString",
  "totalPrice": 123,
  "payedPrice": 123,
  "change": 123,
  "deliveryMode": "fakeString",
  "rating": 123,
  "notification": "fakeString",
  "createdAt": "fakeString",
  "userData": {},
  "orderData": [
    {}
  ]
};
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
  "id": "fakeString",
  "companyId": "fakeString",
  "status": "fakeString",
  "paymentForm": "fakeString",
  "totalPrice": 123,
  "payedPrice": 123,
  "change": 123,
  "deliveryMode": "fakeString",
  "rating": 123,
  "notification": "fakeString",
  "createdAt": "fakeString",
  "userData": {},
  "orderData": [
    {}
  ]
});
  });
});
