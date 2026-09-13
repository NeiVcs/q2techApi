import { container } from 'tsyringe';
import { CreateTableStatusController } from "@modules/tableStatus/controllers/CreateTableStatusController";
import { DeleteTableStatusController } from "@modules/tableStatus/controllers/DeleteTableStatusController";
import { FindAllTableStatusController } from "@modules/tableStatus/controllers/FindAllTableStatusController";
import { FindByCompanyIdTableStatusController } from "@modules/tableStatus/controllers/FindByCompanyIdTableStatusController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createTableStatusController = () => container.resolve(CreateTableStatusController);
export const deleteTableStatusController = () => container.resolve(DeleteTableStatusController);
export const findAllTableStatusController = () => container.resolve(FindAllTableStatusController);
export const findByCompanyIdTableStatusController = () => container.resolve(FindByCompanyIdTableStatusController);
