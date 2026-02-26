import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { createProductController, findAllCompanyProductController, findAllProductController, findByIdProductController, updateProductController } from ".";
import { CreateProductSchema } from "./schemas/CreateProductSchema";
import { FindAllProductSchema } from "./schemas/FindAllProductSchema";
import { FindAllCompanyProductSchema } from "./schemas/FindAllCompanyProductSchema";
import { FindByIdProductSchema } from "./schemas/FindByIdProductSchema";
import { UpdateProductSchema } from "./schemas/UpdateProductSchema";

/**
 * Registers private routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const privateProductRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.post('/v1/product', { schema: CreateProductSchema }, createProductController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/product', { schema: FindAllProductSchema }, findAllProductController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/product/company/:id', { schema: FindAllCompanyProductSchema }, findAllCompanyProductController().handler as RouteHandlerMethod);
    fastifyInstance.get('/v1/product/:id', { schema: FindByIdProductSchema }, findByIdProductController().handler as RouteHandlerMethod);
    fastifyInstance.put('/v1/product/:id', { schema: UpdateProductSchema }, updateProductController().handler as RouteHandlerMethod);
};
