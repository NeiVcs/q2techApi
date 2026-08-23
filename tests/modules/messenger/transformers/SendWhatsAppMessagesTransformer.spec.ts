import { SendWhatsAppMessagesTransformer } from "../../../../src/modules/messenger/transformers/SendWhatsAppMessagesTransformer";

describe("SendWhatsAppMessagesTransformer", () => {
  let transformer: SendWhatsAppMessagesTransformer;

  beforeEach(() => {
    transformer = new SendWhatsAppMessagesTransformer();
  });

  it("deve mapear corretamente fromApi", () => {
    const request: any = {
      body: {
        "number": "fakeString",
        "message": "fakeString",
      }
    };
    const dto = transformer.fromApi(request);
    expect(dto).toMatchObject({
      "number": "fakeString",
      "message": "fakeString",
    });
  });
  it("deve mapear corretamente toApi", () => {
    const outputDTO: any = {
      "success": true,
      "message": "fakeString"
    };
    const result = transformer.toApi(outputDTO);
    expect(result).toMatchObject({
      "success": true,
      "message": "fakeString"
    });
  });
});
