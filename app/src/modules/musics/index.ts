import { container } from 'tsyringe';
import { ListAllMusicsController } from "@modules/musics/controllers/ListAllMusicsController";

export * from './private.routes.v1';

export const listAllMusicsController = () => container.resolve(ListAllMusicsController);
