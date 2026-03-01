import { UpdateOrderTransformer } from "../../../../src/modules/order/transformers/UpdateOrderTransformer";

describe("UpdateOrderTransformer", () => {
  let transformer: UpdateOrderTransformer;

  beforeEach(() => {
    transformer = new UpdateOrderTransformer();
  });
  
  it("deve mapear corretamente fromApi", () => {
    const request: any = {
  body: {
  "orderId": "fakeString",
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
},
  params: {
  "id": "fakeString"
}
};
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
  "id": "fakeString",
  "orderId": "fakeString",
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
});
