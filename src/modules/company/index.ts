import { container } from 'tsyringe';
import { CreateCompanyController } from "@modules/company/controllers/CreateCompanyController";
import { FindAllCompanyController } from "@modules/company/controllers/FindAllCompanyController";
import { FindByIdCompanyController } from "@modules/company/controllers/FindByIdCompanyController";
import { UpdateCompanyController } from "@modules/company/controllers/UpdateCompanyController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createCompanyController = () => container.resolve(CreateCompanyController);
export const findAllCompanyController = () => container.resolve(FindAllCompanyController);
export const findByIdCompanyController = () => container.resolve(FindByIdCompanyController);
export const updateCompanyController = () => container.resolve(UpdateCompanyController);
