import { singleton } from 'tsyringe';
import { FastifyRequest } from 'fastify';
import { AttendantAlertBodyRequest, AttendantAlertResponse } from '@modules/messenger/schemas/AttendantAlertSchema'
import { AttendantAlertInputDTO } from "@modules/messenger/dto/AttendantAlertInputDTO";
import { AttendantAlertOutputDTO } from "@modules/messenger/dto/AttendantAlertOutputDTO";


@singleton()
export class AttendantAlertTransformer {
  public fromApi(request?: FastifyRequest<{ Body: AttendantAlertBodyRequest }>): AttendantAlertInputDTO {
    const { body } = request;

    return {
      table: body?.table || '',
      companyId: body?.companyId || '',
    };
  }

  public toApi(outputDTO: AttendantAlertOutputDTO): AttendantAlertResponse {
    return {
      message: outputDTO?.message ?? '',
    };
  }
}
