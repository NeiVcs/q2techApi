import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { FindByIdCompanySchema } from "./schemas/FindByIdCompanySchema";
import { findByIdCompanyController, findByUrlCompanyController } from ".";
import { FindByUrlCompanySchema } from "./schemas/FindUrlCompanySchema";

/**
 * Registers public routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const publicCompanyRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.get('/v1/company/:id', { schema: FindByIdCompanySchema }, findByIdCompanyController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/company/url/:url', { schema: FindByUrlCompanySchema }, findByUrlCompanyController().handler as RouteHandlerMethod);
};
