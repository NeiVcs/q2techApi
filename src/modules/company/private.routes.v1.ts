import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { CreateCompanySchema } from "./schemas/CreateCompanySchema";
import { createCompanyController, deleteCompanyController, findAllCompanyController, findByIdCompanyController, updateCompanyController } from ".";
import { FindByIdCompanySchema } from "./schemas/FindByIdCompanySchema";
import { UpdateCompanySchema } from "./schemas/UpdateCompanySchema";
import { FindAllCompanySchema } from "./schemas/FindAllCompanySchema";
import { DeleteCompanySchema } from "./schemas/DeleteCompanySchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateCompanyRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.post('/v1/company', { schema: CreateCompanySchema }, createCompanyController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/company', { schema: FindAllCompanySchema }, findAllCompanyController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/company/:id', { schema: FindByIdCompanySchema }, findByIdCompanyController().handler as RouteHandlerMethod);
  fastifyInstance.put('/v1/company/:id', { schema: UpdateCompanySchema }, updateCompanyController().handler as RouteHandlerMethod);
  fastifyInstance.delete('/v1/company/:id', { schema: DeleteCompanySchema }, deleteCompanyController().handler as RouteHandlerMethod);
};
