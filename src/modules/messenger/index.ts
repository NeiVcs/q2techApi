import { container } from 'tsyringe';
import { AttendantAlertController } from "@modules/messenger/controllers/AttendantAlertController";
import { WhatsAppMessengerController } from '@modules/messenger/controllers/WhatsAppMessengerController';

export * from './private.routes.v1';
export * from './public.routes.v1';

export const attendantAlertController = () => container.resolve(AttendantAlertController);
export const whatsAppMessengerController = () => container.resolve(WhatsAppMessengerController);

