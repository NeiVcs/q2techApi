import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { deleteCompanyController, requestUserDeletionController, updateCompanyController } from ".";
import { UpdateCompanySchema } from "./schemas/UpdateCompanySchema";
import { DeleteCompanySchema } from "./schemas/DeleteCompanySchema";
import { RequestUserDeletionSchema } from "./schemas/RequestUserDeletionSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateCompanyRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.put('/v1/company/:id', { schema: UpdateCompanySchema }, updateCompanyController().handler as RouteHandlerMethod);
  fastifyInstance.delete('/v1/company/:id', { schema: DeleteCompanySchema }, deleteCompanyController().handler as RouteHandlerMethod);
  fastifyInstance.post('/v1/company/delete', { schema: RequestUserDeletionSchema }, requestUserDeletionController().handler as RouteHandlerMethod);
};
