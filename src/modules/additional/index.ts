import { container } from 'tsyringe';
import { CreateAdditionalController } from "@modules/additional/controllers/CreateAdditionalController";
import { DeleteAdditionalController } from "@modules/additional/controllers/DeleteAdditionalController";
import { FindAllAdditionalController } from "@modules/additional/controllers/FindAllAdditionalController";
import { FindByIdAdditionalController } from "@modules/additional/controllers/FindByIdAdditionalController";
import { UpdateAdditionalController } from "@modules/additional/controllers/UpdateAdditionalController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createAdditionalController = () => container.resolve(CreateAdditionalController);
export const deleteAdditionalController = () => container.resolve(DeleteAdditionalController);
export const findAllAdditionalController = () => container.resolve(FindAllAdditionalController);
export const findByIdAdditionalController = () => container.resolve(FindByIdAdditionalController);
export const updateAdditionalController = () => container.resolve(UpdateAdditionalController);
