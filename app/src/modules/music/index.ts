import { container } from 'tsyringe';
import { FindAllMusicController } from './controllers/FindAllMusicController';

export * from './private.routes.v1';

export const findAllMusicController = () => container.resolve(FindAllMusicController);
