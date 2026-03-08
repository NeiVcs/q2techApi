import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { FindByIdCompanySchema } from "./schemas/FindByIdCompanySchema";
import { createCompanyController, findAllCompanyController, findByIdCompanyController, findByUrlCompanyController } from ".";
import { FindByUrlCompanySchema } from "./schemas/FindByUrlCompanySchema";
import { FindAllCompanySchema } from "./schemas/FindAllCompanySchema";
import { CreateCompanySchema } from "./schemas/CreateCompanySchema";

/**
 * Registers public routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const publicCompanyRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.post('/v1/company', { schema: CreateCompanySchema }, createCompanyController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/company', { schema: FindAllCompanySchema }, findAllCompanyController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/company/:id', { schema: FindByIdCompanySchema }, findByIdCompanyController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/company/url/:url', { schema: FindByUrlCompanySchema }, findByUrlCompanyController().handler as RouteHandlerMethod);
};
