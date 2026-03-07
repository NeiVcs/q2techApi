import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { deleteCompanyController, findAllCompanyController, updateCompanyController } from ".";
import { UpdateCompanySchema } from "./schemas/UpdateCompanySchema";
import { FindAllCompanySchema } from "./schemas/FindAllCompanySchema";
import { DeleteCompanySchema } from "./schemas/DeleteCompanySchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateCompanyRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.get('/v1/company', { schema: FindAllCompanySchema }, findAllCompanyController().handler as RouteHandlerMethod);
  fastifyInstance.put('/v1/company/:id', { schema: UpdateCompanySchema }, updateCompanyController().handler as RouteHandlerMethod);
  fastifyInstance.delete('/v1/company/:id', { schema: DeleteCompanySchema }, deleteCompanyController().handler as RouteHandlerMethod);
};
