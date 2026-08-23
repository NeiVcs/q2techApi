import { singleton } from 'tsyringe';
import { FastifyRequest, FastifyReply } from "fastify";
import { AttendantAlertBodyRequest, AttendantAlertResponse } from '@modules/messenger/schemas/AttendantAlertSchema'
import { AttendantAlertTransformer } from '@modules/messenger/transformers/AttendantAlertTransformer';
import { AttendantAlertService } from '@modules/messenger/services/AttendantAlertService';

@singleton()
export class AttendantAlertController {
  constructor(
    private readonly transformer: AttendantAlertTransformer,
    private readonly service: AttendantAlertService
  ) { }

  handler = async (request: FastifyRequest<{ Body: AttendantAlertBodyRequest }>, reply: FastifyReply): Promise<AttendantAlertResponse> => {
    const inputDTO = this.transformer.fromApi(request);
    const outputDTO = await this.service.execute(inputDTO);
    reply.code(200);
    return this.transformer.toApi(outputDTO);
  }
}
