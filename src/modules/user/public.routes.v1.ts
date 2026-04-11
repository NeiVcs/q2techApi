import { FastifyInstance, FastifyPluginAsync, RouteHandlerMethod } from "fastify";
import { CreateUserSchema } from "./schemas/CreateUserSchema";
import { createUserAndCompanyController, updateUserPasswordController } from ".";
import { CreateUserAndCompanySchema } from "./schemas/CreateUserAndCompanySchema";
import { UpdateUserPasswordSchema } from "./schemas/UpdateUserPasswordSchema";

/**
 * Registers public routes for API version 1.
 *
 * @param {FastifyInstance} fastifyInstance - The Fastify instance where the routes will be registered.
 */
export const publicUserRoutesV1: FastifyPluginAsync = async (fastifyInstance: FastifyInstance) => {
    fastifyInstance.post('/v1/user', { schema: CreateUserSchema }, createUserAndCompanyController().handler as RouteHandlerMethod);
    fastifyInstance.post('/v1/user/company', { schema: CreateUserAndCompanySchema }, createUserAndCompanyController().handler as RouteHandlerMethod);
    fastifyInstance.post('/v1/user/change-password', { schema: UpdateUserPasswordSchema }, updateUserPasswordController().handler as RouteHandlerMethod);
};
