import { container } from 'tsyringe';
import { AuthController } from "@modules/auth/controllers/AuthController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const authController = () => container.resolve(AuthController);
