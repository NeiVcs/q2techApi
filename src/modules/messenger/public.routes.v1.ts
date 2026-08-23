import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { AttendantAlertSchema } from "./schemas/AttendantAlertSchema";
import { attendantAlertController } from ".";

/**
 * Registers public routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const publicMessengerRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.post('/v1/attendant-alert', { schema: AttendantAlertSchema }, attendantAlertController().handler as RouteHandlerMethod);
};
