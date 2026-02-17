import { container } from 'tsyringe';
import { FindBillPaymentsListController } from "@modules/billPayments/controllers/FindBillPaymentsListController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const findBillPaymentsListController = () => container.resolve(FindBillPaymentsListController);
