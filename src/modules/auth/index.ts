import { container } from 'tsyringe';
import { AuthController } from "@modules/auth/controllers/AuthController";
import { RefreshTokenController } from "@modules/auth/controllers/RefreshTokenController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const authController = () => container.resolve(AuthController);
export const refreshTokenController = () => container.resolve(RefreshTokenController);
