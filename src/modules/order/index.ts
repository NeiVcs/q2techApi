import { container } from 'tsyringe';
import { CreateOrderController } from "@modules/order/controllers/CreateOrderController";
import { FindAllOrderController } from "@modules/order/controllers/FindAllOrderController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createOrderController = () => container.resolve(CreateOrderController);
export const findAllOrderController = () => container.resolve(FindAllOrderController);
