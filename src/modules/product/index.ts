import { container } from 'tsyringe';
import { CreateProductController } from "@modules/product/controllers/CreateProductController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createProductController = () => container.resolve(CreateProductController);
