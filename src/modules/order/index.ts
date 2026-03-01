import { container } from 'tsyringe';
import { CreateOrderController } from "@modules/order/controllers/CreateOrderController";
import { DeleteOrderController } from "@modules/order/controllers/DeleteOrderController";
import { FindAllOrderController } from "@modules/order/controllers/FindAllOrderController";
import { FindByCompanyIdOrderController } from "@modules/order/controllers/FindByCompanyIdOrderController";
import { FindByIdOrderController } from "@modules/order/controllers/FindByIdOrderController";
import { UpdateOrderController } from "@modules/order/controllers/UpdateOrderController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createOrderController = () => container.resolve(CreateOrderController);
export const deleteOrderController = () => container.resolve(DeleteOrderController);
export const findAllOrderController = () => container.resolve(FindAllOrderController);
export const findByCompanyIdOrderController = () => container.resolve(FindByCompanyIdOrderController);
export const findByIdOrderController = () => container.resolve(FindByIdOrderController);
export const updateOrderController = () => container.resolve(UpdateOrderController);
