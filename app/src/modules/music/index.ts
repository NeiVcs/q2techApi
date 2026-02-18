import { container } from 'tsyringe';
import { CreateMusicController } from "@modules/music/controllers/CreateMusicController";
import { FindAllMusicController } from "@modules/music/controllers/FindAllMusicController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createMusicController = () => container.resolve(CreateMusicController);
export const findAllMusicController = () => container.resolve(FindAllMusicController);
