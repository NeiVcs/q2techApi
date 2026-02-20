import { container } from 'tsyringe';
import { CreateMusicController } from "@modules/music/controllers/CreateMusicController";
import { DeleteMusicController } from "@modules/music/controllers/DeleteMusicController";
import { FindAllMusicController } from "@modules/music/controllers/FindAllMusicController";
import { FindByIdMusicController } from "@modules/music/controllers/FindByIdMusicController";
import { UpdateMusicController } from "@modules/music/controllers/UpdateMusicController";

export * from './private.routes.v1';
export * from './public.routes.v1';

export const createMusicController = () => container.resolve(CreateMusicController);
export const deleteMusicController = () => container.resolve(DeleteMusicController);
export const findAllMusicController = () => container.resolve(FindAllMusicController);
export const findByIdMusicController = () => container.resolve(FindByIdMusicController);
export const updateMusicController = () => container.resolve(UpdateMusicController);
