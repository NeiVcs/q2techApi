import { container } from 'tsyringe';
import { DeleteImageController } from "@modules/cloudinary/controllers/DeleteImageController";
import { FindAllImagesController } from "@modules/cloudinary/controllers/FindAllImagesController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const deleteImageController = () => container.resolve(DeleteImageController);
export const findAllImagesController = () => container.resolve(FindAllImagesController);
