import { container } from 'tsyringe';
import { CreateUserController } from "@modules/user/controllers/CreateUserController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createUserController = () => container.resolve(CreateUserController);
