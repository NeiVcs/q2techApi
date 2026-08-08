import { container } from 'tsyringe';
import { FindAllImagesController } from "@modules/cloudinary/controllers/FindAllImagesController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const findAllImagesController = () => container.resolve(FindAllImagesController);
