import { container } from 'tsyringe';
import { CreateOrderController } from "@modules/order/controllers/CreateOrderController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createOrderController = () => container.resolve(CreateOrderController);
