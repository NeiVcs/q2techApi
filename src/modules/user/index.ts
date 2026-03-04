import { container } from 'tsyringe';
import { CreateUserController } from "@modules/user/controllers/CreateUserController";
import { FindAllUserController } from "@modules/user/controllers/FindAllUserController";
import { FindByIdUserController } from "@modules/user/controllers/FindByIdUserController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createUserController = () => container.resolve(CreateUserController);
export const findAllUserController = () => container.resolve(FindAllUserController);
export const findByIdUserController = () => container.resolve(FindByIdUserController);
