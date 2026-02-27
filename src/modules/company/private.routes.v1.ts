import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { CreateCompanySchema } from "./schemas/CreateCompanySchema";
import { createCompanyController, findByIdCompanyController } from ".";
import { FindByIdCompanySchema } from "./schemas/FindByIdCompanySchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateCompanyRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
  fastifyInstance.post('/v1/company', { schema: CreateCompanySchema }, createCompanyController().handler as RouteHandlerMethod);
  fastifyInstance.get('/v1/company/:id', { schema: FindByIdCompanySchema }, findByIdCompanyController().handler as RouteHandlerMethod);
};
