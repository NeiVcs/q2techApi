import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { WhatsAppMessengerSchema } from "./schemas/WhatsAppMessengerSchema";
import { whatsAppMessengerController } from ".";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateMessengerRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.post('/v1/send-message', { schema: WhatsAppMessengerSchema }, whatsAppMessengerController().handler as RouteHandlerMethod);
};
