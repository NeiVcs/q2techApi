import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { CreateTableStatusSchema } from "./schemas/CreateTableStatusSchema";
import { createTableStatusController, deleteTableStatusController, findAllTableStatusController, findByCompanyIdTableStatusController } from ".";
import { DeleteTableStatusSchema } from "./schemas/DeleteTableStatusSchema";
import { FindAllTableStatusSchema } from "./schemas/FindAllTableStatusSchema";
import { FindByCompanyIdTableStatusSchema } from "./schemas/FindByCompanyIdTableStatusSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateTableStatusRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.post('/v1/tableStatus', { schema: CreateTableStatusSchema }, createTableStatusController().handler as RouteHandlerMethod);
  fastifyInstance.delete('/v1/tableStatus/:id', { schema: DeleteTableStatusSchema }, deleteTableStatusController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/tableStatus', { schema: FindAllTableStatusSchema }, findAllTableStatusController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/tableStatus/:companyId', { schema: FindByCompanyIdTableStatusSchema }, findByCompanyIdTableStatusController().handler as RouteHandlerMethod);
};
