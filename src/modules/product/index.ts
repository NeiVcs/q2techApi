import { container } from 'tsyringe';
import { CreateProductController } from "@modules/product/controllers/CreateProductController";
import { FindAllProductController } from "@modules/product/controllers/FindAllProductController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createProductController = () => container.resolve(CreateProductController);
export const findAllProductController = () => container.resolve(FindAllProductController);
