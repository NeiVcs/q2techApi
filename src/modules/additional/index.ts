import { container } from 'tsyringe';
import { CreateAdditionalController } from "@modules/additional/controllers/CreateAdditionalController";
import { DeleteAdditionalController } from "@modules/additional/controllers/DeleteAdditionalController";
import { FindAllAdditionalController } from "@modules/additional/controllers/FindAllAdditionalController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createAdditionalController = () => container.resolve(CreateAdditionalController);
export const deleteAdditionalController = () => container.resolve(DeleteAdditionalController);
export const findAllAdditionalController = () => container.resolve(FindAllAdditionalController);
