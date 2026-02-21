import { container } from 'tsyringe';
import { CreateAdditionalController } from "@modules/additional/controllers/CreateAdditionalController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createAdditionalController = () => container.resolve(CreateAdditionalController);
