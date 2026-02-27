import { container } from 'tsyringe';
import { CreateProductController } from "@modules/product/controllers/CreateProductController";
import { DeleteProductController } from "@modules/product/controllers/DeleteProductController";
import { FindAllCompanyProductController } from "@modules/product/controllers/FindAllCompanyProductController";
import { FindAllProductController } from "@modules/product/controllers/FindAllProductController";
import { FindByIdProductController } from "@modules/product/controllers/FindByIdProductController";
import { UpdateProductController } from "@modules/product/controllers/UpdateProductController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createProductController = () => container.resolve(CreateProductController);
export const deleteProductController = () => container.resolve(DeleteProductController);
export const findAllCompanyProductController = () => container.resolve(FindAllCompanyProductController);
export const findAllProductController = () => container.resolve(FindAllProductController);
export const findByIdProductController = () => container.resolve(FindByIdProductController);
export const updateProductController = () => container.resolve(UpdateProductController);
