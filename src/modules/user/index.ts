import { container } from 'tsyringe';
import { CreateUserController } from "@modules/user/controllers/CreateUserController";
import { DeleteUserController } from "@modules/user/controllers/DeleteUserController";
import { FindAllUserController } from "@modules/user/controllers/FindAllUserController";
import { FindByIdUserController } from "@modules/user/controllers/FindByIdUserController";
import { UpdateUserController } from "@modules/user/controllers/UpdateUserController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createUserController = () => container.resolve(CreateUserController);
export const deleteUserController = () => container.resolve(DeleteUserController);
export const findAllUserController = () => container.resolve(FindAllUserController);
export const findByIdUserController = () => container.resolve(FindByIdUserController);
export const updateUserController = () => container.resolve(UpdateUserController);
