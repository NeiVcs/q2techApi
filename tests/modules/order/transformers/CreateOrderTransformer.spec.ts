import { CreateOrderTransformer } from "../../../../src/modules/order/transformers/CreateOrderTransformer";

describe("CreateOrderTransformer", () => {
  let transformer: CreateOrderTransformer;

  beforeEach(() => {
    transformer = new CreateOrderTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "companyId": "fakeString",
  "paymentForm": "fakeString",
  "totalPrice": 123,
  "payedPrice": 123,
  "change": 123,
  "deliveryMode": "fakeString",
  "rating": 123,
  "notification": "fakeString",
  "userData": {},
  "orderData": [
    {}
  ]
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "companyId": "fakeString",
  "paymentForm": "fakeString",
  "totalPrice": 123,
  "payedPrice": 123,
  "change": 123,
  "deliveryMode": "fakeString",
  "rating": 123,
  "notification": "fakeString",
  "userData": {},
  "orderData": [
    {}
  ]
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
