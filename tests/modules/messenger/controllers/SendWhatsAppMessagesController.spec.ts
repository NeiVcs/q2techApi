import { FastifyReply } from "fastify";
import { mock } from "jest-mock-extended";

import { SendWhatsAppMessagesController } from "../../../../src/modules/messenger/controllers/SendWhatsAppMessagesController";
import { SendWhatsAppMessagesTransformer } from "../../../../src/modules/messenger/transformers/SendWhatsAppMessagesTransformer";
import { SendWhatsAppMessagesService } from "../../../../src/modules/messenger/services/SendWhatsAppMessagesService";

describe("SendWhatsAppMessagesController", () => {
  let controller: SendWhatsAppMessagesController;
  let transformer: jest.Mocked<SendWhatsAppMessagesTransformer>;
  let service: jest.Mocked<SendWhatsAppMessagesService>;
  let reply: jest.Mocked<FastifyReply>;

  beforeEach(() => {
    jest.clearAllMocks();
    transformer = { fromApi: jest.fn(), toApi: jest.fn() } as any;
    service = { execute: jest.fn() } as any;
    reply = mock<FastifyReply>();
    controller = new SendWhatsAppMessagesController(transformer, service);
  });

  it("deve chamar service e transformer corretamente", async () => {
    const inputDTO = {
      "number": "fakeString",
      "message": "fakeString",
    };
    const outputDTO = {
      "success": true,
      "message": "fakeString"
    };

    transformer.fromApi.mockReturnValue(inputDTO);
    service.execute.mockResolvedValue(outputDTO);
    transformer.toApi.mockReturnValue(outputDTO);

    const result = await controller.handler({
      body: {
        "number": "fakeString",
        "message": "fakeString",
      }
    } as any, reply);

    expect(transformer.fromApi).toHaveBeenCalled();
    expect(service.execute).toHaveBeenCalledWith(inputDTO);
    expect(transformer.toApi).toHaveBeenCalledWith(outputDTO);
    expect(reply.code).toHaveBeenCalledWith(200);
    expect(result).toEqual(outputDTO);
  });
});
