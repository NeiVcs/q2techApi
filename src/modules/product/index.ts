import { container } from 'tsyringe';
import { CreateProductController } from "@modules/product/controllers/CreateProductController";
import { FindAllCompanyProductController } from "@modules/product/controllers/FindAllCompanyProductController";
import { FindAllProductController } from "@modules/product/controllers/FindAllProductController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createProductController = () => container.resolve(CreateProductController);
export const findAllCompanyProductController = () => container.resolve(FindAllCompanyProductController);
export const findAllProductController = () => container.resolve(FindAllProductController);
