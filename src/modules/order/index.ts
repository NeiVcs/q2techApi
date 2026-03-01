import { container } from 'tsyringe';
import { CreateOrderController } from "@modules/order/controllers/CreateOrderController";
import { FindAllOrderController } from "@modules/order/controllers/FindAllOrderController";
import { FindByIdOrderController } from "@modules/order/controllers/FindByIdOrderController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createOrderController = () => container.resolve(CreateOrderController);
export const findAllOrderController = () => container.resolve(FindAllOrderController);
export const findByIdOrderController = () => container.resolve(FindByIdOrderController);
